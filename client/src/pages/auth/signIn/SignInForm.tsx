import { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { ControlledInput } from '@/modules/common/inputs';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@/contexts/auth';
import { Button, Link, Stack } from '@mui/material';
import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import { ArrowIcon } from '@/icons/ArrowIcon';
import { useDisplayDataContext } from '@/contexts/displayData';
import { FormProvider, useForm } from 'react-hook-form';
import AuthService from '@/services/auth.service';
import { passwordYup, phoneYup } from '@/modules/validate/validate';
import { ROUTE_PATH } from '@/app/routerProvider';
import { INPUT_TYPES } from '@/modules/common/inputs/input.types';
import { yupResolver } from '@hookform/resolvers/yup';

interface ISignInPayload {
  phone: string;
  password: string;
  callback?: () => void;
}

const initialSignUpPayload = {
  phone: '',
  password: '',
};

const formSchema = Yup.object().shape({
  phone: Yup.string().max(30).required(),
  password: passwordYup,
});

const SignInForm = () => {
  const { setAuth } = useAuthContext();
  const { displayAlert } = useDisplayDataContext();

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['SignIn'],
    mutationFn: ({ phone, password }: { phone: string; password: string }) =>
      AuthService.signIn(phone, password),
    onSuccess: (res) => {
      if (res.data) {
        setAuth({
          refreshToken: res.data.RefreshToken,
          accessToken: res.data.AccessToken,
        });
      }
    },
    onError: () => {
      displayAlert('Phone number or Password is wrong');
    },
  });

  const onFinish = useCallback(({ password, phone }: ISignInPayload) => {
    mutate({ password, phone });
  }, []);

  useEffect(() => {}, [data]);

  const methods = useForm<ISignInPayload>({
    defaultValues: initialSignUpPayload,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <>
      <SpinComponent spinning={isPending || isSubmitting} />
      <div className=" bg-light-Bg dark:bg-dark-Bg">
        <Stack gap={'1.25rem'} className={'relative'}>
          <Link
            href={ROUTE_PATH.SIGN_UP}
            color={'#fff'}
            className={
              'w-screen bg-dark-Bg py-5 flex justify-center items-center gap-2.5 shadow-lg pl-6 pr-10'
            }
          >
            Sign up get Vani coin
          </Link>
          <Link
            href={ROUTE_PATH.SIGN_UP}
            color={'#fff'}
            className={'text-[inherit] absolute top-2/4 -translate-y-2/4 right-6'}
          >
            <ArrowIcon />
          </Link>
        </Stack>
        <div className={'flex flex-col items-center gap-5 my-[4rem] dark:text-white'}>
          <h2 className="text-[2.25rem] font-[400] font-PlayfairDisplay dark:text-white">
            Vani Sign In
          </h2>
          <p className={'font-[400] font-PlayfairDisplay'}>Sign In for get Vani coin</p>
        </div>
        <FormProvider {...methods}>
          <div className={'w-full'}>
            <form onSubmit={handleSubmit(onFinish)} className={'sign-in-form'}>
              <Stack alignItems={'center'} gap={'1.25rem'}>
                <ControlledInput
                  inputType={INPUT_TYPES.INPUT}
                  name="phone"
                  label={'Phone number'}
                  className={'w-[250px]'}
                />
                <ControlledInput
                  inputType={INPUT_TYPES.PASSWORD}
                  name="password"
                  label={'Password'}
                  className={'w-[250px]'}
                />
                <Button
                  className="max-w-[250px]  w-full block mx-auto"
                  type="submit"
                  variant={'contained'}
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default SignInForm;
