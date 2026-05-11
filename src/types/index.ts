export type SectionKey =
    | 'main'
    | 'about'
    | 'skills'
    | 'thoughts'
    | 'timeline'
    | 'contact'
    | 'manual'
    | 'about_mac'
    | 'shiplog'
    | 'graveyard';

export type WindowState = {
    id: string
    title: string
    section: SectionKey
    position: { x: number; y: number }
    size: { width: number; height: number }
    isMinimized: boolean
    zIndex: number
    isVisible: boolean
}

export type WindowManagerState = {
    windows: WindowState[]
    activeWindowId: string
    nextZIndex: number
}

// Additional types mapping to data
export type Thought = {
    text: string
    tag: string
}

