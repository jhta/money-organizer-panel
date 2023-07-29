declare module 'react-alert-template-basic' {
  import { Component } from 'react';
  import { AlertTemplateProps } from 'react-alert';
  export interface AlertComponentProps {
    id?: string;
    message?: string;
    options?: any;
    close?: () => void;
  }

  export default class AlertTemplate extends Component<
    AlertTemplateProps,
    any
  > {}
}
