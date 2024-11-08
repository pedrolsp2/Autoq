import { ImmerStateCreator } from '.'

// type ResetState = {}

type ResetActions = {
    resetAll: () => void
}

export type ResetSlice = ResetActions

export const useResetSlice: ImmerStateCreator<ResetSlice> = () => ({
    resetAll: () => {
        // Do something
    },
})
