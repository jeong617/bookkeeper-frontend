import React from 'react';

// css
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from 'flowbite-react';

interface PopUpProps {
  isOpened: boolean;
  onClick: () => void;
  onClose: () => void;
}

function PopUp({ isOpened, onClick, onClose }: PopUpProps): React.JSX.Element | null {
  return (
    <>
      {isOpened && (
        <Modal popup show={isOpened} size="md" onClose={onClose} className="bg-black/30 z-10">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                정말 도서를 지우시겠습니까?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={onClick}>
                  삭제
                </Button>
                <Button color="gray" onClick={onClose}>
                  취소
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default PopUp;
