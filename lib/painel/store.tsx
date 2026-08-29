'use client'

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import {
  seedState,
  type ApiKey,
  type BudgetAlert,
  type KeyEnvironment,
  type Member,
  type MemberRole,
  type PainelSettings,
  type PainelState,
} from './data'

const STORAGE_KEY = 'nylla-painel-v1'

type Action =
  | { type: 'create_key'; key: ApiKey }
  | { type: 'revoke_key'; id: string }
  | { type: 'rotate_key'; id: string; prefix: string }
  | { type: 'update_key_expiration'; id: string; expiresAt: string }
  | { type: 'toggle_model'; id: string }
  | { type: 'set_models_status'; ids: string[]; status: 'active' | 'inactive' }
  | { type: 'toggle_provider'; id: string }
  | { type: 'invite_member'; member: Member }
  | { type: 'remove_member'; id: string }
  | { type: 'set_member_role'; id: string; role: MemberRole }
  | { type: 'toggle_budget'; id: string }
  | { type: 'add_budget'; budget: BudgetAlert }
  | { type: 'update_settings'; settings: Partial<PainelSettings> }
  | { type: 'complete_checklist'; id: string }
  | { type: 'reset' }
  | { type: 'hydrate'; state: PainelState }

function pushActivity(state: PainelState, text: string, detail: string, kind: PainelState['activity'][number]['kind']): PainelState['activity'] {
  return [
    { id: `a_${Date.now()}`, text, detail, time: 'agora', kind },
    ...state.activity,
  ].slice(0, 12)
}

function reducer(state: PainelState, action: Action): PainelState {
  switch (action.type) {
    case 'hydrate':
      return action.state
    case 'reset':
      return seedState
    case 'create_key':
      return {
        ...state,
        keys: [action.key, ...state.keys],
        activity: pushActivity(state, 'Chave criada', `${action.key.name} por Ana Ribeiro`, 'key'),
      }
    case 'revoke_key':
      return {
        ...state,
        keys: state.keys.map((k) => (k.id === action.id ? { ...k, revoked: true } : k)),
        activity: pushActivity(state, 'Chave revogada', state.keys.find((k) => k.id === action.id)?.name ?? '', 'key'),
      }
    case 'rotate_key':
      return {
        ...state,
        keys: state.keys.map((k) => (k.id === action.id ? { ...k, prefix: action.prefix, lastUsed: '—' } : k)),
        activity: pushActivity(state, 'Chave rotacionada', state.keys.find((k) => k.id === action.id)?.name ?? '', 'key'),
      }
    case 'update_key_expiration':
      return {
        ...state,
        keys: state.keys.map((k) => (k.id === action.id ? { ...k, expiresAt: action.expiresAt } : k)),
        activity: pushActivity(
          state,
          'Expiração da chave alterada',
          `${state.keys.find((k) => k.id === action.id)?.name ?? ''} · ${action.expiresAt}`,
          'key',
        ),
      }
    case 'toggle_model': {
      const model = state.models.find((m) => m.id === action.id)
      const next = model?.status === 'active' ? 'inactive' : 'active'
      return {
        ...state,
        models: state.models.map((m) => (m.id === action.id ? { ...m, status: next } : m)),
        activity: pushActivity(state, next === 'active' ? 'Modelo ativado' : 'Modelo desativado', `${model?.name ?? ''} por Ana Ribeiro`, 'model'),
      }
    }
    case 'set_models_status':
      return {
        ...state,
        models: state.models.map((m) => (action.ids.includes(m.id) ? { ...m, status: action.status } : m)),
        activity: pushActivity(
          state,
          action.status === 'active' ? 'Modelos ativados em lote' : 'Modelos desativados em lote',
          `${action.ids.length} modelo(s) por Ana Ribeiro`,
          'model',
        ),
      }
    case 'toggle_provider': {
      const provider = state.providers.find((p) => p.id === action.id)
      const next = provider?.status === 'paused' ? 'operational' : 'paused'
      return {
        ...state,
        providers: state.providers.map((p) => (p.id === action.id ? { ...p, status: next } : p)),
        activity: pushActivity(
          state,
          next === 'paused' ? 'Provedor pausado' : 'Provedor reativado',
          provider?.name ?? '',
          'provider',
        ),
      }
    }
    case 'invite_member':
      return {
        ...state,
        members: [...state.members, action.member],
        activity: pushActivity(state, 'Usuário convidado', `${action.member.email} como ${action.member.role}`, 'user'),
      }
    case 'remove_member':
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.id),
        activity: pushActivity(state, 'Usuário removido', state.members.find((m) => m.id === action.id)?.email ?? '', 'user'),
      }
    case 'set_member_role':
      return {
        ...state,
        members: state.members.map((m) => (m.id === action.id ? { ...m, role: action.role } : m)),
      }
    case 'toggle_budget':
      return {
        ...state,
        budgets: state.budgets.map((b) => (b.id === action.id ? { ...b, active: !b.active } : b)),
      }
    case 'add_budget':
      return {
        ...state,
        budgets: [...state.budgets, action.budget],
        activity: pushActivity(state, 'Alerta de orçamento criado', action.budget.name, 'budget'),
      }
    case 'update_settings':
      return { ...state, settings: { ...state.settings, ...action.settings } }
    case 'complete_checklist':
      return {
        ...state,
        checklist: state.checklist.map((c) => (c.id === action.id ? { ...c, done: true } : c)),
      }
    default:
      return state
  }
}

interface PainelContextValue {
  state: PainelState
  dispatch: React.Dispatch<Action>
  environment: KeyEnvironment
  setEnvironment: (env: KeyEnvironment) => void
  hydrated: boolean
}

const PainelContext = createContext<PainelContextValue | null>(null)

export function PainelProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, seedState)
  const [environment, setEnvironment] = useState<KeyEnvironment>('prod')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as PainelState
        if (parsed && Array.isArray(parsed.keys) && parsed.settings) {
          // Mescla campos novos do seed em chaves persistidas de versões anteriores
          const keys = parsed.keys.map((k) => {
            const seed = seedState.keys.find((s) => s.id === k.id)
            return seed ? { ...seed, ...k, requests30d: k.requests30d ?? seed.requests30d, expiresAt: k.expiresAt ?? seed.expiresAt, rateLimit: k.rateLimit ?? seed.rateLimit } : k
          })
          dispatch({
            type: 'hydrate',
            state: {
              ...seedState,
              ...parsed,
              keys,
              settings: { ...seedState.settings, ...parsed.settings },
            },
          })
        }
      }
    } catch {
      // dados corrompidos: ignora e usa o seed
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage indisponível
    }
  }, [state, hydrated])

  const value = useMemo(
    () => ({ state, dispatch, environment, setEnvironment, hydrated }),
    [state, environment, hydrated],
  )

  return <PainelContext.Provider value={value}>{children}</PainelContext.Provider>
}

export function usePainel() {
  const ctx = useContext(PainelContext)
  if (!ctx) throw new Error('usePainel deve ser usado dentro de PainelProvider')
  return ctx
}

export function resetPainelStorage() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
