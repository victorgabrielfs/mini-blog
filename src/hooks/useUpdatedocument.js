import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

const initialState = {
  loading: null,
  error: null
}

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'UPDATED_DOC':
      return { ...state, loading: false, error: null }
    default:
      return state
  }
}

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState)

  const [cancelled, setCancelled] = useState(false)

  function checkIfCancelled(action) {
    if (!cancelled) dispatch(action)
  }

  const updateDocument = async (uid, data) => {
    checkIfCancelled({
      type: 'LOADING',
      payload: null
    })

    try {
      const docRef = doc(db, docCollection, uid)

      const updatedDocument = updateDoc(docRef, data)

      checkIfCancelled({
        type: 'UPDATED_DOC',
        payload: updatedDocument
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

  return { response, updateDocument }
}
