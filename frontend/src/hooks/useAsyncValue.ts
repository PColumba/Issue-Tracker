import { useEffect, useState } from "react";

export enum ActionState {
    VALUE, LOADING, ERROR
}

type ValueOrLoadingOrError<T> = {
    value: T,
    type: ActionState.VALUE
} |  {
    value?: T | undefined,
    type: ActionState.LOADING
} |  {
    error: unknown,
    type: ActionState.ERROR
}

export default function useAsyncValue<T>(fn: () => Promise<T>, placeholder?: T): [ValueOrLoadingOrError<T>, typeof setValue] {
    const [value, setValue] = useState<ValueOrLoadingOrError<T>>({ value: placeholder || undefined, type: ActionState.LOADING})
    useEffect(() => {
        fn()
            .then(value => setValue({value, type: ActionState.VALUE}))
            .catch((error: unknown) => setValue({error, type: ActionState.ERROR}))
    }, [])
    return [value, setValue]
}