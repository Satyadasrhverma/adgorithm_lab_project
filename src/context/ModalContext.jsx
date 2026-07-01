import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import CardModal from '../components/CardModal'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null)

  const openModal  = useCallback((data) => setModalData(data), [])
  const closeModal = useCallback(() => setModalData(null), [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalData && <CardModal data={modalData} onClose={closeModal} />}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be inside ModalProvider')
  return ctx
}
