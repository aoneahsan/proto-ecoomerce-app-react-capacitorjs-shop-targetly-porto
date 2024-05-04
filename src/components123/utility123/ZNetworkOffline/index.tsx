// #region ---- Core Imports ----
import React, { useEffect } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Network } from '@capacitor/network';
import { useRecoilState } from 'recoil';

// #endregion

// #region ---- Custom Imports ----
import { messages } from '@/utils/messages123';
import { ZRUText } from '@/components123/RadixUI';
import { ZNetworkRStateAtom } from '@/store123/global123/index.recoil';

// #endregion

const ZNetworkOffline: React.FC = () => {
  const [zNetworkState, setZNetworkState] = useRecoilState(ZNetworkRStateAtom);

  useEffect(() => {
    void Network.addListener('networkStatusChange', (status) => {
      setZNetworkState((oldValues) => ({
        ...oldValues,
        status: { ...status }
      }));
    });

    const logCurrentNetworkStatus = async (): Promise<void> => {
      const status = await Network.getStatus();
      setZNetworkState((oldValues) => ({
        ...oldValues,
        status: { ...status }
      }));
    };
    void logCurrentNetworkStatus();

    return () => {
      void Network.removeAllListeners();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {zNetworkState?.status?.connected ? null : (
        <div className='fixed inset-0 z-50 bg-opacity-50 bg-white/70'>
          <div className='px-6 py-3 mx-auto shadow-lg bg-warning/70 w-max h-max'>
            <ZRUText className='block text-lg'>
              {messages.network.noInternet.title}
            </ZRUText>
            <ZRUText className='block text-sm'>
              {messages.network.noInternet.message}
            </ZRUText>
            {/* <ZIonButton className='mt-3'>Reload</ZIonButton> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ZNetworkOffline;
