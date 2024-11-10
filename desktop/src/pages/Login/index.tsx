import { FormEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Cog, Eye, EyeOff, KeyRound, Loader, UserCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/api/auth/user';
import { toast } from 'sonner';
import { AxiosError, isAxiosError } from 'axios';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputUser, setInputUser] = useState('');
  const [password, setPassword] = useState('');
  const [focusInputUser, setFocusInputUser] = useState(false);
  const [focusInputPassword, setFocusInputPassword] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const login = useStore.use.login();

  async function authenticateAsync({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const token = await authenticateUser(username, password);
    return token;
  }

  const {
    mutate: onLogin,
    isError,
    isPending,
  } = useMutation({
    mutationFn: authenticateAsync,
    onSuccess: (data) => {
      login({ token: data.token, usuario: data.usuario });
      navigate(state?.path || '/');
    },
    onError: (err: AxiosError) => {
      if (isAxiosError<{ message: string }>(err)) {
        toast('Usuário ou senha incorretos.', {
          style: { background: '#ca3333', color: '#fff' },
        });
      }
    },
  });
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userRef.current?.focus();
  }, [isError]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputUser && password) {
      onLogin({ username: inputUser, password });
    }
  };

  return (
    <div className="grid items-center justify-center w-full h-screen">
      <form
        className="flex w-full flex-col gap-4 p-6 rounded border-primary-50/50 sm:w-[452px] border"
        onSubmit={onFormSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          <Cog className="size-8 text-primary-400" />
          <span className="text-xl font-semibold">AutoQ</span>
        </div>
        <div
          className={`w-full rounded flex items-center border-b-2 py-1 bg-[#fafafa] px-2 ${
            focusInputUser && 'border-b-primary-500'
          } ${
            isError ? 'border-b-red-500 bg-red-500/10' : 'border-b-primary-200'
          } transition-all`}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <UserCircle2
              className={`${
                isError ? 'text-red-500' : 'text-primary-500'
              } w-full h-full`}
            />
          </span>
          <input
            autoComplete="off"
            id="user"
            placeholder="Digite seu usuário"
            className={` w-full rounded-md p-2 outline-none bg-transparent placeholder:text-primary-300`}
            type="text"
            ref={userRef}
            onChange={(e) => setInputUser(e.target.value)}
            onFocus={() => setFocusInputUser(!focusInputUser)}
            onBlur={() => setFocusInputUser(!focusInputUser)}
          />
        </div>
        <div
          className={`w-full rounded flex items-center border-b-2 py-1 bg-[#fafafa] px-2 ${
            focusInputPassword && 'border-b-primary-500'
          } ${
            isError ? 'border-b-red-500 bg-red-500/10' : 'border-b-primary-200'
          } transition-all`}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <KeyRound
              className={`${
                isError ? 'text-red-500' : 'text-primary-500'
              } w-full h-full`}
            />
          </span>
          <div className="flex items-center w-full">
            <input
              id="password"
              placeholder="Digite sua senha"
              className="w-full p-2 bg-transparent rounded-md outline-none placeholder:text-primary-300"
              type={passwordVisible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusInputPassword(!focusInputPassword)}
              onBlur={() => setFocusInputPassword(!focusInputPassword)}
            />
            {passwordVisible ? (
              <EyeOff
                className="cursor-pointer hover:text-primary-200 text-primary-500"
                onClick={() => setPasswordVisible((prev) => !prev)}
                size={24}
              />
            ) : (
              <Eye
                className="cursor-pointer hover:text-gray-200"
                onClick={() => setPasswordVisible((prev) => !prev)}
                size={24}
              />
            )}
          </div>
        </div>

        <Button className="mt-3 rounded-md md:py-3">
          {isPending ? <Loader className="animate-spin" /> : 'Entrar'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
