import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { convertFromRaw, EditorState } from 'draft-js'

import { RawUrl, urlCredentials } from '../../types/url'

import { uiActions } from '../ui'
import { urlsActions } from '.'

export const getURLData = (id: string, onError?: (e: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`/urls/${id}`)
        if (!data?.content?.entityMap) data.content.entityMap = {}
        if (!data.content || !data.content.blocks || !data.title) throw new Error()
        dispatch(
          urlsActions.setCurrentUrlData({
            title: data.title,
            content: EditorState.createWithContent(convertFromRaw(data.content)) 
        }))
      }
      catch(err: any)  {
        if (err?.response?.status === 403) dispatch(urlsActions.setCurrentUrlData({hasPassword: true}))
        else {
          const errorMessage = err?.response?.data?.msg || err?.response?.data|| err.message || 'Network Error try again later.'
          if (onError) onError(errorMessage)
      }
  }
}
}

export const getURLDataWithPassword = (urlCredentials: urlCredentials, onError?: (e: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(`/urls/login`, urlCredentials)
      if (!data?.content?.entityMap) data.content.entityMap = {}
      if (!data.content || !data.content.blocks || !data.title) throw new Error()
      dispatch(
        urlsActions.setCurrentUrlData({
          title: data.title,
          content: EditorState.createWithContent(convertFromRaw(data.content))
        }))
    } catch (err: any) {
      const errorMessage = err?.response?.data?.msg || err?.response?.data|| err.message || 'Network Error try again later.'
      if (onError) onError(errorMessage)
    }
  }
}

export const createURL = (url: RawUrl, onError?: (e: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(uiActions.setIsLoading(true))
      const { data } = await axios.post('/urls/create/', url)
      if (!data._id) throw new Error()
      dispatch(urlsActions.setCreatedURLId(data._id))
      dispatch(uiActions.setIsLoading(false))
    } catch (err: any) {
      dispatch(uiActions.setIsLoading(false))
      const errorMessage = err?.response?.data?.msg || err?.response?.data|| err.message || 'Network Error try again later.'
      if (onError) onError(errorMessage)
    }
  }
}
