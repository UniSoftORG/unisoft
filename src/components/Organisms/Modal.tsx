"use client";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";

interface ModalProps {
  activeComponent?: string | boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement | null;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  preventDefault?: boolean;
  onOpen?: (component: string | boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  activeComponent,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  preventDefault,
  onOpen,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={!!activeComponent} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-xl bg-neural-dark px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div
                  className={"flex w-full justify-between items-center mb-4"}
                >
                  <span
                    className={
                      "text-center flex-grow text-2xl font-bold text-white"
                    }
                  >
                    {title}
                  </span>
                  <button
                    type='button'
                    className='rounded-full bg-gray-600 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={() => onClose()}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                {body}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  // useEffect(() => {
  //   setShowModal(isOpen);
  // }, [isOpen]);
  //
  // const handleClose = useCallback(() => {
  //   if (disabled) {
  //     return;
  //   }
  //
  //   setShowModal(false);
  //   setTimeout(() => {
  //     onClose();
  //   }, 300);
  // }, [onClose, disabled]);
  //
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       handleClose();
  //     }
  //   };
  //
  //   // Attach the listeners on component mount.
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Detach the listeners on component unmount.
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleSubmit = useCallback(() => {
  //   if (disabled) {
  //     return;
  //   }
  //
  //   onSubmit ? onSubmit() : null;
  // }, [onSubmit, disabled]);
  //
  // if (!isOpen && !body) {
  //   return null;
  // }
  //
  // return (
  //   <>
  //     <div
  //       className='
  //         justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neural-dark bg-opacity-80
  //       '
  //     >
  //       <div
  //         className='
  //         relative
  //         w-full
  //         md:w-4/6
  //         lg:w-3/6
  //         xl:w-2/5
  //         my-6
  //         mx-auto
  //         lg:h-auto
  //         md:h-auto
  //         '
  //       >
  //         {/*content*/}
  //         <div
  //           ref={modalRef}
  //           className={`
  //           scale
  //           duration-300
  //           h-full
  //           ${showModal ? "scale-100" : "scale-0"}
  //           ${showModal ? "opacity-100" : "opacity-0"}
  //         `}
  //         >
  //           <div
  //             className='
  //             translate
  //             border-2
  //             border-gray-darker
  //             border-opacity-60
  //             lg:h-auto
  //             md:h-auto
  //             rounded-none
  //             lg:rounded-3xl
  //             shadow-2xl
  //             relative
  //             flex
  //             flex-col
  //             w-full
  //             bg-neural-dark
  //             outline-none
  //             focus:outline-none
  //           '
  //           >
  //             <div
  //               className='
  //               flex
  //               items-center
  //               p-6
  //               rounded-t
  //               justify-center
  //               relative
  //               '
  //             >
  //               <div className='text-2xl font-bold text-gray-light'>
  //                 {title}
  //               </div>
  //               <button
  //                 className='
  //                   p-2
  //                   border-2
  //                   border-gray-dark
  //                   rounded-full
  //                   hover:opacity-70
  //                   transition
  //                   absolute
  //                   right-8
  //                 '
  //                 onClick={(e: any) => {
  //                   preventDefault ? e.preventDefault() : null;
  //                   handleClose();
  //                 }}
  //               >
  //                 X{/*<Image*/}
  //                 {/*  src={IoMdClose}*/}
  //                 {/*  alt={"IoMdClose"}*/}
  //                 {/*  width={18}*/}
  //                 {/*  height={18}*/}
  //                 {/*/>*/}
  //               </button>
  //             </div>
  //             <div className='relative p-6 flex-auto'>{body}</div>
  //             <div className='flex flex-col gap-2 p-6'>
  //               <div
  //                 className='
  //                   flex
  //                   flex-row
  //                   items-center
  //                   justify-center
  //                   gap-4
  //                   w-full
  //                 '
  //               >
  //                 {/*{actionLabel && onSubmit && (*/}
  //                 {/*  <Button*/}
  //                 {/*    color={buttonColor}*/}
  //                 {/*    gradient={buttonGradient ?? "red-dark"}*/}
  //                 {/*    className={"justify-center py-4 w-1/2"}*/}
  //                 {/*    disabled={disabled}*/}
  //                 {/*    label={actionLabel}*/}
  //                 {/*    onClick={handleSubmit}*/}
  //                 {/*  />*/}
  //                 {/*)}*/}
  //               </div>
  //               {footer}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Modal;
