import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import { MenuItem } from '../interfaces/menu.interface';

export interface IAppContext {
  menu: MenuItem[];
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({ menu: [] });

export const AppContextProvider = ({ menu, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);
  const setMenu = (newMenu: MenuItem[]) => setMenuState(newMenu);

  useEffect(() => {
    setMenu(menu);
  }, [menu]);

  return (
    <AppContext.Provider value={{ menu: menuState, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};