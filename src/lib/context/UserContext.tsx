'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useUser, { emptyUser } from '@/lib/store';
import { I_UserSchema } from '@/lib/types';

const UserContext = createContext<
  { user: I_UserSchema; setUser: (user: I_UserSchema) => void } | undefined
>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<I_UserSchema>(emptyUser);

  useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((d) => setUser(d ?? emptyUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
