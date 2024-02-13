import { FC, ReactNode } from 'react';
import { IconButton, Modal, ModalProps } from '@mui/material';
import { CloseIcon } from '@/icons';

interface ICustomModal extends ModalProps {
  header?: string | ReactNode;
  width?: number | string;
  height?: number | string;
}

const CustomModal: FC<ICustomModal> = (props) => {
  const { header, width, children, height, ...rest } = props;
  return (
    <>
      <Modal {...rest}>
        <div
          style={{
            maxWidth: width || 600,
            maxHeight: height || '90%',
          }}
          className="w-[90%] -translate-y-2/4 top-2/4 mx-auto p-10 flex flex-col relative overflow-y-hidden bg-light-Bg dark:bg-dark-Bg max-md:px-6 max-md:w-full"
        >
          {header && (
            <h3 className="pb-5 text-[2.25rem] text-center font-PlayfairDisplay pb-5 max-md:text-[1.5rem]">{header}</h3>
          )}
          <div className="absolute right-3 top-3">
            <IconButton
              onClick={(e) => {
                if (rest?.onClose) {
                  rest.onClose(e, 'backdropClick');
                }
              }}
            >
              <CloseIcon style={{ width: '.7rem', height: '.7rem' }} />
            </IconButton>
          </div>
          <div className={'overflow-y-auto flex-1 pt-[10px]'}>{children}</div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
