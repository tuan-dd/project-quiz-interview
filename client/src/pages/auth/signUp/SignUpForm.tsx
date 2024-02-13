import { useCallback } from 'react';
import { ControlledInput } from '@/modules/common/inputs';
import { CUSTOMER_FORM_SCHEMA } from '@/modules/validate/validate';
import { useNavigate } from 'react-router-dom';
import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import { Button, Link, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useDisplayDataContext } from '@/contexts/displayData';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/auth.service';
import { IUserRegister } from '@/types/servicesType';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTE_PATH } from '@/app/routerProvider';
import { INPUT_TYPES } from '@/modules/common/inputs/input.types';
import { ArrowIcon } from '@/icons';

interface IFormPersonalValue extends IUserRegister {
  confirmPassword: string;
}

const initialValues: IFormPersonalValue = {
  firstName: '',
  lastName: '',
  password: '',
  phone: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const methods = useForm<IFormPersonalValue>({
    defaultValues: initialValues,
    resolver: yupResolver(CUSTOMER_FORM_SCHEMA),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  const { displayAlert } = useDisplayDataContext();

  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: (payload: IUserRegister) => AuthService.signUp(payload),
    onError: (e: any) => {
      displayAlert(e);
    },
    onSuccess: () => {
      navigate(ROUTE_PATH.SIGN_IN);
    },
    retry: 2,
  });

  const onFinish = useCallback(async (values: IFormPersonalValue) => {
    const { confirmPassword, ...rest } = values;

    mutate(rest);
  }, []);

  return (
    <>
      <SpinComponent spinning={isPending || isSubmitting} />
      <Stack gap={'1.25rem'}>
        <Link
          href={ROUTE_PATH.SIGN_IN}
          color={'#fff'}
          className={
            'w-screen bg-dark-Bg py-5 px-5 flex justify-center items-center gap-2.5 shadow-lg'
          }
        >
          You already have an account
          <ArrowIcon className={'text-[inherit]'} />
        </Link>
      </Stack>
      <Stack
        className="max-w-[700px] w-full bg-light-Bg dark:bg-dark-Bg mx-auto mt-10"
        alignItems={'center'}
        gap={'1.25rem'}
        justifyContent={'center'}
      >
        <FormProvider {...methods}>
          <Box className={'w-full'}>
            <form onSubmit={handleSubmit(onFinish)} className={'sign-in-form'} id="user-sign-up">
              <Stack direction={'column'} gap={'1.25rem'}>
                <h2 className="text-[2.25rem] text-center font-[400] font-PlayfairDisplay dark:text-white">
                  Customer Account Setup
                </h2>
                <h3 className={'text-center text-[1.125rem] font-bold mb-5 dark:text-white'}>
                  Your Information
                </h3>
                <Stack direction={'row'} gap={'1.25rem'}>
                  <ControlledInput
                    inputType={INPUT_TYPES.INPUT}
                    name="firstName"
                    label={'First name'}
                    className={'flex-1 w-full'}
                  />
                  <ControlledInput
                    inputType={INPUT_TYPES.INPUT}
                    name="lastName"
                    label={'Last name'}
                    className={'flex-1 w-full'}
                  />
                </Stack>
                <ControlledInput
                  inputType={INPUT_TYPES.INPUT}
                  name="phone"
                  label={'Phone'}
                  className={'w-full'}
                />
                <ControlledInput
                  inputType={INPUT_TYPES.PASSWORD}
                  name="password"
                  label={'Password'}
                  className={'w-full'}
                />
                <ControlledInput
                  className={'w-full'}
                  inputType={INPUT_TYPES.PASSWORD}
                  name="confirmPassword"
                  label={'Confirm password'}
                />
              </Stack>
            </form>
          </Box>
        </FormProvider>
        <Button
          form="user-sign-up"
          className="max-w-[250px]  w-full block mx-auto"
          type="submit"
          variant={'contained'}
        >
          Sign Up
        </Button>
      </Stack>
    </>
  );
};

export default SignUpForm;
