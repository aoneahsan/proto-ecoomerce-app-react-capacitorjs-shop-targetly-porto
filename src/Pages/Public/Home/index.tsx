// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from 'recoil';
import ZLottie from '@/Packages/ReactLottie';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString, reportCustomError } from '@/utils/Helpers';
import Copyright from '@/Components/Inpage/Copyright';
import { AppRoutes } from '@/Routes/AppRoutes';
import ZButton from '@/Components/Elements/Button';
import { useZNavigate } from '@/ZHooks/Navigation.hook';

// #endregion

// #region ---- Types Imports ----
import { ZInvoiceTypeE } from '@/Types/Auth/Invoice';
import { ZFill } from '@/utils/Enums/Elements.enum';

// #endregion

// #region ---- Store Imports ----
import { ZUserRStateAtom } from '@/Store/Auth/User';

// #endregion

// #region ---- Images Imports ----
import {
  bottomVector,
  hpHeaderImg,
  productVector,
  incomeExpense,
  productLogo,
  ratioDot,
  paymentAnimationLottie,
  rangeImg
} from '@/assets';
import { useZMediaQueryScale } from '@/ZHooks/Helpers.hook';

// #endregion

const HomePage: React.FC = () => {
  // #region custom hooks
  const navigate = useZNavigate();
  const { isSmScale } = useZMediaQueryScale();
  // #endregion

  // #region Recoil
  const ZUserRState = useRecoilValue(ZUserRStateAtom);
  // #endregion

  // #region functions
  const signUpBtnClickHandler = (): void => {
    try {
      void navigate({ to: AppRoutes.register });
    } catch (error) {
      reportCustomError(error);
    }
  };

  const loginBtnClickHandler = (): void => {
    try {
      void navigate({ to: AppRoutes.login });
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <div className='w-full lg:pt-[4rem] maxLg:pt-[2rem] pb-[2rem] h-max bg-secondary'>
      <div className='max-w-[85.4rem]  mx-auto'>
        {/* Header */}
        <div className='xl:w-[90.5%] maxXl:px-[2rem] maxXs:px-[.5rem!important] maxLg:flex-col maxLg:gap-y-10 relative flex justify-center mx-auto'>
          {/* Left-side logo, text, & buttons */}
          <div className='flex flex-col lg:items-start maxLg:items-center maxLg:text-center maxLg:w-full lg:w-1/2'>
            {/* Logo */}
            <div className='lg:h-[12.9rem] maxLg:w-full xs:text-start maxXs:text-center'>
              <img
                className='w-[4.8rem] h-[4.8rem] maxSm:mx-auto relative'
                alt='Logo'
                src={productLogo}
              />
            </div>

            {/* Content and Buttons */}
            <div className='h-auto maxLg:pt-[2rem] relative z-10'>
              <h1 className='font-black lg:mt-5 relative z-10 font-mont-heavy text-[2.25rem] lg:max-w-[73%] w-full leading-[2.7rem] uppercase text-primary'>
                Create invoices quick and painless
              </h1>

              <p className='mt-4 pt-[1px] relative z-10 tracking-wide pb-[2px] font-semibold font-roboto-regular lg:max-w-[61%] leading-[120%] text-[1rem] text-primary'>
                Send business-friendly tax invoices to your clients, and get
                paid faster than ever.
              </p>

              <div className='relative z-10'>
                {typeof ZUserRState === 'object' &&
                isZNonEmptyString(ZUserRState?.email) ? (
                  <ZButton
                    className='mt-10'
                    fill={ZFill.outline}
                    onClick={() => {
                      void navigate({
                        to: AppRoutes.authRoutes.invoices,
                        params: {
                          invoiceType: ZInvoiceTypeE.inv
                        }
                      });
                    }}
                  >
                    My Account
                  </ZButton>
                ) : (
                  <div className='flex w-full gap-5 pt-10 maxSm:flex-col maxLg:justify-center lg:mt-11'>
                    {/* <button
                      className='bg-primary rounded-[4px] py-[.5rem] text-[1rem] tracking-[1.2px] font-mont-heavy px-[1.5rem] font-black text-secondary'
                      onClick={signUpBtnClickHandler}
                    >
                      SIGN UP
                    </button>
                    <button
                      className='bg-transparent border-aqua-shadow border-2 rounded-[4px] py-[.5rem] text-[1rem] tracking-[1.2px] font-mont-heavy px-[1.5rem] font-black text-primary'
                      onClick={loginBtnClickHandler}
                    >
                      LOG IN
                    </button> */}

                    <ZButton
                      className='bg-primary rounded-[4px] py-[.5rem] text-[1rem] tracking-[1.2px] font-mont-heavy px-[1.5rem] font-black text-secondary'
                      onClick={loginBtnClickHandler}
                    >
                      Get started
                    </ZButton>
                  </div>
                )}
              </div>
            </div>

            <div className='absolute hidden md:block lg:bottom-[-6rem] z-0 xl:left-[-9.4rem] left-[-5rem] maxLg:bottom-[-10rem]'>
              <img
                alt='home page vector'
                src={productVector}
                className='maxMd:w-[16rem] maxLg:w-[17rem]'
              />
            </div>
          </div>

          {/* Right-side Image */}
          <div className='relative z-10 flex lg:justify-end maxLg:justify-center maxLg:w-full lg:w-1/2 md:flex maxMd:hidden'>
            <div className='w-[39.125rem] h-[55.625rem]'>
              <img
                src={hpHeaderImg}
                alt='header image'
                className='w-full h-full'
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className='relative mt-[8rem] md:mt-[12rem] maxSm:mt-[5.3rem] maxXl:mx-[2rem] maxMd:mx-[.5rem!important] maxLg:flex-col maxLg:gap-y-10 bg-primary py-[2.8rem] px-[1.5rem] rounded-[3rem] xl:w-[91%] mx-auto flex justify-center'>
          {/*  */}
          <div className='flex items-center justify-center maxLg:w-full lg:w-1/2'>
            <div className='flex flex-col lg:w-[75%] maxLg:w-full maxLg:text-center maxLg:items-center md:gap-y-[3rem] maxMd:gap-y-[2rem]'>
              <h2 className='text-secondary text-[1.5rem] md:text-[2.25rem] max-w-[91%] leading-[120%] font-black uppercase font-mont-heavy'>
                Why use our invoice generator?
              </h2>

              {/* points */}
              <div className='flex flex-col gap-y-4 maxMd:items-start'>
                <div className='flex gap-2 md:items-center maxMd:items-start text-start'>
                  <img src={ratioDot} alt='ratio dot' className='' />
                  <span className='text-[1rem] font-normal leading-[120%] text-secondary font-roboto-regular'>
                    Create client profiles for recurring invoices
                  </span>
                </div>

                <div className='flex gap-2 md:items-center maxMd:items-start text-start'>
                  <img src={ratioDot} alt='ratio dot' className='' />
                  <span className='text-[1rem] font-normal leading-[120%] text-secondary font-roboto-regular'>
                    Support for over 150+ currencies, including crypto
                  </span>
                </div>

                <div className='flex gap-2 md:items-center maxMd:items-start text-start'>
                  <img src={ratioDot} alt='ratio dot' className='' />
                  <span className='text-[1rem] font-normal leading-[120%] text-secondary font-roboto-regular'>
                    Invoices are saved automatically
                  </span>
                </div>
              </div>

              {/* button */}
              <button
                className='py-[.55rem] maxSm:w-full w-max px-[1.5rem] bg-secondary text-primary rounded-[4px] uppercase font-black font-mont-heavy tracking-wide'
                onClick={signUpBtnClickHandler}
              >
                Sign up for free
              </button>
            </div>
          </div>

          {/*  */}
          <div className='flex flex-col items-center justify-end gap-2 maxLg:w-full lg:w-1/2'>
            {/* invoice box */}
            {/* <div className='border-2 border-vanilla-mist sm:w-[28.9785rem] maxSm:w-full pb-5 rounded-[3rem] overflow-hidden'>
              <div className='flex items-center w-full p-6 bg-secondary rounded-b-[3rem] maxSm:flex-col maxSm:gap-2'>
                <div className='rounded-full overflow-hidden w-[4.6875rem] h-[4.6875rem]'>
                  <img
                    alt='Lucia Lopez image'
                    src={luciaLopezImg}
                    className='w-full h-full'
                  />
                </div>
                <span className='ms-3 ps-1 font-semibold font-roboto-medium leading-[120%] text-[1.25rem] tracking-wide text-primary'>
                  Lucia Lopez
                </span>
              </div>

              <div className='px-6 maxSm:text-center'>
                <h3 className='font-medium font-roboto-medium leading-[120%] text-[1.75rem] pt-5 tracking-wide text-secondary'>
                  Invoice
                </h3>
              </div>
              <div className='flex flex-col items-end justify-center px-6 mt-3 maxSm:items-center maxSm:mt-4 me-3 gap-y-1'>
                <div className='flex items-center'>
                  <h3 className='font-normal font-roboto-regular leading-[120%] text-[1.27rem] tracking-wide text-secondary'>
                    Research
                  </h3>
                  <h3 className='font-medium ms-6 font-roboto-medium leading-[120%] text-[1.27rem] tracking-wide text-secondary'>
                    <span className='me-1'>Ξ</span>
                    <span>0.971</span>
                  </h3>
                </div>

                <div className='flex items-center'>
                  <h3 className='font-normal font-roboto-regular leading-[120%] text-[1.27rem] tracking-wide text-secondary'>
                    Report
                  </h3>

                  <h3 className='font-medium font-roboto-medium text-[1.27rem] leading-[120%] ms-6 tracking-wide text-secondary'>
                    <span className='me-1'>Ξ</span>
                    <span>1.289</span>
                  </h3>
                </div>

                <div className='flex items-center pt-3 mt-2 border-t-2 border-vanilla-mist'>
                  <h3 className='font-normal font-roboto-regular leading-[120%] text-[1.27rem] tracking-wide text-secondary'>
                    Total amount due
                  </h3>
                  <h3 className='font-medium font-roboto-medium text-[1.27rem] leading-[120%] ms-6 tracking-wide text-secondary'>
                    <span className='me-1'>Ξ</span>
                    <span>2.260</span>
                  </h3>
                </div>
              </div>
            </div> */}

            {/* Arrow down */}
            {/* <div className='w-max'>
              <img alt='arrow down' src={arrowDown} className='' />
            </div> */}

            {/*  */}
            {/* <div className='flex items-center p-6 maxSm:w-full maxSm:flex-col maxSm:gap-2 sm:w-[28.9785rem] bg-secondary rounded-[3.2rem]'>
              <div className='rounded-full overflow-hidden w-[4.6875rem] h-[4.6875rem] bg-slate-500 object-cover'>
                <img
                  alt='Ryan McMannon image'
                  src={ryanMcMannonImg}
                  className='w-full h-full'
                />
              </div>
              <span className='ms-3 ps-1 font-semibold font-roboto-medium leading-[120%] text-[1.25rem] tracking-wide text-primary'>
                Ryan McMannon
              </span>
              <img
                alt='paid tag'
                src={paidTag}
                className='relative mt-[2px] pe-1 sm:ms-auto'
              />
            </div> */}
            <ZLottie
              options={{
                loop: true,
                autoplay: true,
                animationData: paymentAnimationLottie,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              height={isSmScale ? '28.5rem' : '100%'} // 456
              width={isSmScale ? '25rem' : '100%'} // 400
              isClickToPauseDisabled
              style={{
                cursor: 'default'
              }}
            />
          </div>
        </div>

        {/*  */}
        <div className='xl:w-[91%] flex items-stretch maxXl:mx-[2rem] maxMd:flex-col maxMd:mx-[.5rem!important] mx-auto gap-8 mt-[6.3rem]'>
          <div className='border-2 rounded-[3rem] maxMd:w-full w-1/2 border-aqua-shadow py-[3.9rem] px-[1.5rem] flex flex-col items-center justify-center'>
            <div className='w-[80%] maxMd:w-full'>
              <img
                alt='Range image'
                src={rangeImg}
                className='w-[29rem] mx-auto'
              />
              {/* <ZLottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: flowLottie,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
                height={isLgScale ? '11.8rem' : '100%'}
                width={isLgScale ? '28rem' : 'auto'}
                isClickToPauseDisabled
                style={{
                  cursor: 'default'
                }}
              /> */}

              <div className='pt-5 mt-9 maxMd:text-center'>
                <h2 className='text-primary font-mont-heavy text-[1.5rem] md:text-[1.75rem] leading-[120%]'>
                  Keep track of your payments
                </h2>

                <p className='text-[1rem] mt-3 text-primary'>
                  Easily stay on top of payments with our feature to mark
                  invoices as paid.
                </p>
              </div>
            </div>
          </div>

          <div className='border-2 rounded-[3rem] maxMd:w-full w-1/2 border-aqua-shadow py-[3.9rem] px-[1.5rem] flex flex-col items-center justify-center'>
            <div className='w-[80%] maxMd:w-full'>
              <img
                alt='Income Expense'
                src={incomeExpense}
                className='w-[23rem] mx-auto'
              />

              <div className='mt-3 maxMd:text-center'>
                <h2 className='text-primary font-mont-heavy text-[1.5rem] md:text-[1.75rem] leading-[120%]'>
                  Payments & expenses covered
                </h2>

                <p className='text-[1rem] mt-3 text-primary'>
                  Seamlessly create and manage both invoices and expenses with
                  Nyukin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div
          className='xl:w-[91%] maxXl:mx-[2rem] maxMd:mx-[.5rem!important] flex maxMd:flex-col maxMd:text-center items-center mx-auto relative overflow-hidden gap-8 mt-[6.5rem] py-[3.8rem] rounded-[3rem] md:bg-[length:35%_105%] bg-[length:30%] md:bg-[74%] bg-right-bottom bg-no-repeat bg-primary'
          style={{ backgroundImage: `url(${bottomVector})` }}
        >
          <div className='relative z-10 flex items-center'>
            <h2 className='text-[1.5rem] md:text-[2.25rem] uppercase leading-[120%] text-secondary font-mont-heavy font-black xl:max-w-[70%] ms-12 lg:max-w-[70%] maxXl:ps-3'>
              Get started for free and create invoices instantly
            </h2>
          </div>
          {/* <img
            alt="bottom vector"
            src={bottomVector}
            className="absolute left-[45%] z-0 w-[35%]"     background-position: 63%;
    background-size: 35% 105%;
          /> */}
          <div className='relative z-10 flex items-center justify-center overflow-hidden md:w-1/2'>
            {/* button */}
            <button
              className='py-[.8rem] w-max px-[1.875rem] text-[1.25rem] bg-secondary text-primary rounded-[4px] uppercase font-black font-mont-heavy tracking-wide'
              onClick={signUpBtnClickHandler}
            >
              Get started
            </button>
          </div>
        </div>

        {/*  */}
        <div className='w-full text-center mt-[3rem]'>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
