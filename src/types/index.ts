export type SectionKey =
    | 'main'
    | 'projects'
    | 'about'
    | 'skills'
    | 'thoughts'
    | 'timeline'
    | 'contact'
    | 'manual'

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

export type Project = {
    id: string
    name: string
    candid: string
    problem: string
    team: string[] | null
    teamName?: string
    whatIDid: string
    stack: string[]
    outcome: string
    honest: string
    link: string | null
}
