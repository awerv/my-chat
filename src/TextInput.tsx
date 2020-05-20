import React, { Component } from 'react';
import './TextInput.css'

export interface TextInputAndButtonOptions
{
    value?: string;
    onChange?: ( value: string ) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
    buttonContent?: string;
    onClick?: ( text: string ) => boolean | void;
};

export class TextInput extends Component<TextInputAndButtonOptions>
{
    state = { value: this.props.value, focus: false };

    render()
    {
        let attrs = {} as any;
        if ( this.props.autofocus )
            attrs.autoFocus = true;
    
       if ( this.props.onEnter )
            attrs.onKeyDown = e =>
            {
                if ( e.keyCode === 13 )
                    this.props.onEnter!();
            };

        /*
            had to change value={ this.state.value } to value={ this.props.value }
            because the state was not updated from the props and I found no way to force it
            to be updated, and the secret code functionality got lost
        */

        return (
            <div className="text-input">
                <input { ...attrs } type={ this.props.type ?? "text" } value={ this.props.value }
                    onChange={ e =>
                    {
                        this.setState( { value: e.target.value } );
                        this.props.onChange?.( e.target.value );
                    } }
                onBlur={ () => this.setState( { focus: false } ) }
                onFocus={ () => this.setState( { focus: true } ) } />
                <div className="focus-indicator"></div>
                <label className={ this.state.value || this.state.focus ? "subsided" : "" }>
                    { this.props.placeholder }
                </label>
            </div> );
    }
}


export class TextInputAndButton extends Component<TextInputAndButtonOptions>
{
    textInput = React.createRef<TextInput>();

    onClick()
    {
        if ( this.props.onClick?.( this.textInput.current?.state.value ?? "" ) )
            this.textInput.current?.setState( { value: "" } );
    }

    render()
    {
        return (
            <div className="text-input-and-button">
                <TextInput { ...this.props } ref={ this.textInput } onEnter={ () => this.onClick() } />
                <button type="button" onClick={ () => this.onClick() }>
                    { this.props.buttonContent }
                </button>
            </div> );
    }
    
}