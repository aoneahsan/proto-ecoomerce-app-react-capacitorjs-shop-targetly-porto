import { useSetRecoilState } from 'recoil';

//
import {
  ZLoaderRStateAtom,
  ZModalRStateAtom,
  ZSidebarRStateAtom
} from '@/Store/ZGlobal/index.recoil';
import { type ZGenericObject } from '@/Types/Global/index.type';
import { ZColorEnum } from '@/utils/Enums/Elements.enum';

/**
 * Custom hook for managing a sidebar state in a React application.
 *
 * @template T - The type for the additional properties passed to the sidebar component.
 * @param component - The React component to be rendered in the sidebar.
 * @param props - Additional properties to be passed to the sidebar component.
 * @returns An object containing functions to open and close the sidebar.
 */
export const useZSideBar = <T>({
  component,
  props,
  width
}: {
  // eslint-disable-next-line
  component: React.FC<any>;
  props?: ZGenericObject<T>;
  width?: string;
}): {
  openSidebar: () => void;
  closeSidebar: () => void;
} => {
  const setSidebarRStateAtom = useSetRecoilState(ZSidebarRStateAtom);

  /**
   * Opens the sidebar and sets its content.
   */
  const openSidebar = (): void => {
    setSidebarRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: true,
      component,
      componentProps: { closeSidebar, ...props },
      width: width
    }));
  };

  /**
   * Closes the sidebar.
   */
  const closeSidebar = (): void => {
    setSidebarRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: false
    }));
  };

  return { openSidebar, closeSidebar };
};

/**
 * Custom hook for managing a loading indicator state in a React application.
 *
 * @returns An object containing functions to show and hide a loading indicator.
 */
export const useZLoader = (): {
  showLoader: (message: string) => void;
  hideLoader: () => void;
} => {
  const setZLoaderRStateAtom = useSetRecoilState(ZLoaderRStateAtom);

  /**
   * Function to show a loading indicator with a specified message.
   *
   * @param message - The message to be displayed along with the loading indicator.
   */
  const showLoader = (message: string): void => {
    setZLoaderRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: true,
      message
    }));
  };

  /**
   * Function to hide the loading indicator.
   */
  const hideLoader = (): void => {
    setZLoaderRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: false,
      message: ''
    }));
  };

  return { showLoader, hideLoader };
};

/**
 * Custom hook for managing a modal state and actions.
 *
 * @param component - The React component to be rendered inside the modal.
 * @param props - Optional additional properties to be passed to the modal component.
 *
 * @returns An object containing functions to show and hide the modal.
 */
export const useZModal = <T>({
  component,
  bgColor = ZColorEnum.dark,
  componentProps,
  width,
  height,
  containerClassName
}: {
  // eslint-disable-next-line
  component: React.FC<any>;
  bgColor: ZColorEnum;
  width?: string;
  height?: string;
  containerClassName?: string;
  componentProps?: ZGenericObject<T>;
  onDidDismiss?: <P>(props?: P) => void;
}): {
  showModal: (showModalProps?: {
    componentProps?: ZGenericObject<T> | undefined;
    onDidDismiss?: (<P>(props?: P | undefined) => void) | undefined;
  }) => void;
  hideModal: () => void;
} => {
  let _onDidDismiss: (<P>(props?: P) => void) | undefined;
  const setZModalRStateAtom = useSetRecoilState(ZModalRStateAtom);

  /**
   * Function to hide the modal.
   */
  const hideModal = <A>(props?: ZGenericObject<A>): void => {
    if (_onDidDismiss !== undefined) {
      _onDidDismiss(props);
    }
    //
    setZModalRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: false
    }));
  };

  /**
   * Function to show the modal.
   */
  const showModal = (showModalProps?: {
    componentProps?: ZGenericObject<T>;
    onDidDismiss?: <P>(props?: P) => void;
  }): void => {
    setZModalRStateAtom((oldValues) => ({
      ...oldValues,
      isOpen: true,
      component,
      componentProps: {
        hideModal,
        ...componentProps,
        ...showModalProps?.componentProps
      },
      color: bgColor,
      width,
      height,
      containerClassName
    }));

    if (
      showModalProps?.onDidDismiss !== undefined &&
      showModalProps?.onDidDismiss !== null
    ) {
      _onDidDismiss = showModalProps?.onDidDismiss;
    }
  };

  return { showModal, hideModal };
};
