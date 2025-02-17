import { Modal as MantineModal, Title, CloseButton } from '@mantine/core'

interface ModalProps {
  opened: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: string | number
}

export const Modal = ({
  opened,
  onClose,
  title,
  children,
  size = 'lg',
}: ModalProps) => {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      size={size}
      padding="md"
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Title order={3}>{title}</Title>
        </div>
      }
    >
      {children}
    </MantineModal>
  )
}
