import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

const initialState = {
  loading: null,
  error: null
}

const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'DELETED_DOC':
      return { ...state, loading: false, error: null }
    default:
      return state
  }
}

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState)

  const [cancelled, setCancelled] = useState(false)

  function checkIfCancelled(action) {
    if (!cancelled) dispatch(action)
  }

  const deleteDocument = async (id) => {
    checkIfCancelled({
      type: 'LOADING',
      payload: null
    })

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id))

      checkIfCancelled({
        type: 'DELETED_DOC',
        payload: deletedDocument
      })
    } catch (error) {
      console.log(error)
      checkIfCancelled({
        type: 'ERROR',
        payload: error.message
      })
    }
  }

  useEffect(() => {
    return () => {
      setCancelled(true)
    }
  }, [])

  return { deleteDocument, response }
}
