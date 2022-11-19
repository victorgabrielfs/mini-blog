import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
  loading: null,
  error: null
}

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'INSERTED_DOC':
      return { ...state, loading: false, error: null }
    default:
      return state
  }
}

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState)

  const [cancelled, setCancelled] = useState(false)

  function checkIfCancelled(action) {
    if (!cancelled) dispatch(action)
  }

  const insertDocument = async (data) => {
    checkIfCancelled({
      type: 'LOADING',
      payload: null
    })

    try {
      const newDocument = { ...data, createdAt: Timestamp.now() }

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkIfCancelled({
        type: 'INSERTED_DOC',
        payload: insertedDocument
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

  return { response, insertDocument }
}
