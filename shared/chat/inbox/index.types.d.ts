import * as React from 'react'
import * as I from 'immutable'
import {ConversationIDKey} from '../../constants/types/chat2'

export type RowItemSmall = {
  type: 'small'
  conversationIDKey: ConversationIDKey
}
export type RowItemBigTeamsLabel = {
  type: 'bigTeamsLabel'
  isFiltered: boolean
}
export type RowItemBigHeader = {
  type: 'bigHeader'
  teamname: string
}
export type RowItemBig = {
  type: 'big'
  conversationIDKey: ConversationIDKey
  teamname: string
  channelname: string
}
export type RowItemDivider = {
  showButton: boolean
  type: 'divider'
}

export type RowItem = RowItemSmall | RowItemBigTeamsLabel | RowItemBigHeader | RowItemBig | RowItemDivider

export type RouteState = I.RecordOf<{
  smallTeamsExpanded: boolean
}>

export type Props = {
  allowShowFloatingButton: boolean
  children?: React.ReactNode
  neverLoaded: boolean
  nowOverride?: number
  onEnsureSelection: () => void
  onNewChat: () => void
  onSelectUp: () => void
  onSelectDown: () => void
  onUntrustedInboxVisible: (conversationIDKeys: Array<ConversationIDKey>) => void
  rows: Array<RowItem>
  selectedConversationIDKey: ConversationIDKey
  smallTeamsExpanded: boolean
  toggleSmallTeamsExpanded: () => void
  unreadIndices: I.List<number>
  isSearching: boolean
}
