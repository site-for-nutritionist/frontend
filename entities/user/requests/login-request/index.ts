'use client';

import { useForm, UseFormReturn } from "react-hook-form"
import { useMemo } from "react";
import { ExceptionService, ValidationRunner } from "@/shared/utils";
import { ILoginErrors, ILoginPort } from "../../interfaces"
import { LoginValidatorFactory } from "../../validators"
import { useUserStore } from "../../provider";
import { useApplyFormErrors } from "@/shared/helpers/forms";
import { COMMON_ERRORS_MESSAGES } from "@/shared/messages/common";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/shared/components";
import { InternalCode } from "@/shared/enums";

interface IUseLoginRequest {
    form: UseFormReturn<ILoginPort>
    onSubmit: (data: ILoginPort) => Promise<void>
}

const DEFAULT_VALUES: ILoginPort = {
    email: '',
    password: '',
}

export const useLoginRequest = (): IUseLoginRequest => {
    const router = useRouter()
    const form = useForm({ defaultValues: DEFAULT_VALUES })
    const snackbar = useSnackbar()

    const applyMessageErrors = useApplyFormErrors(form)

    const loginRequest = useUserStore(state => state.login)

    const _validator = useMemo(() => new ValidationRunner(new LoginValidatorFactory()), [])

    const handleOnSubmit = async (data: ILoginPort): Promise<void> => {
        try {
            _validator.validate(data)
            await loginRequest(data)
            router.push('/account')
        } catch (error) {
            const e = error as ExceptionService<ILoginErrors>

            if (e.code !== InternalCode.VALIDATION_ERROR) {
                snackbar.make({ message: e.message, color: 'error' })
            } else if (e.data !== undefined) {
                applyMessageErrors(e.data, (e) => COMMON_ERRORS_MESSAGES[e.code])
            }
        }
    }

    return { form, onSubmit: handleOnSubmit }
}