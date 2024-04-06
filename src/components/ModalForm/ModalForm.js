import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import styles from './modalForm.module.scss'
import { BaseChangeForm } from '../BaseChangeForm/BaseChangeForm'
import { BaseDeleteForm } from '../BaseDeleteForm/BaseDeleteForm'
import Button, { buttonTypes } from '../Button/Button'

const ModalForm = ({ isOpen, setOpen, triggerShow, type, todo }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {triggerShow &&
          <Button kind={type}>
            {type === buttonTypes.toAdd ? 'Add' : 'Update'} Task
          </Button>
        }
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Description className={styles.DialogDescription}>
            {(type === buttonTypes.toAdd || type === buttonTypes.toUpdate) &&
              <BaseChangeForm type={type} setOpen={setOpen} todo={todo} />
            }
            {type === buttonTypes.toDelete &&
              <BaseDeleteForm type={type} setOpen={setOpen} todo={todo} />}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default ModalForm;