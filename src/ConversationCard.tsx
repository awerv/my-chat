import React, { Component } from 'react';
import { ConversationDto, proxy } from './char.d'

export class ConversationCard extends Component<{
        conversation: ConversationDto,
        selected: boolean,
        onSelect: () => void
        }>
    {

    componentDidMount()
    {
        proxy.addEventListener( "message", ( cid, m ) =>
            {
                if ( cid === this.props.conversation.channelId )
                    this.forceUpdate();
            }, this );
    }
    
    componentWillUnmount()
    {    
        proxy.removeAllEventListener( this );
    }

    convertToDate(d: Date)
    {
        const year = String(d.getFullYear());
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
      
        return year + "-" + month + "-" + day;
    }

    render()
    {
        let lastMessage = this.props.conversation.lastMessages.length > 0 ?

        this.props.conversation.lastMessages[ this.props.conversation.lastMessages.length - 1 ] : null;

        return (
            <div className={ "conversation-card" + ( this.props.selected ? " selected" : "" ) }
            onClick={ () => this.props.onSelect() }>
                <div className="row">
                    <span className="channel-name">{ this.props.conversation.name }</span>
                    <span className="time">
                    { lastMessage && this.convertToDate(new Date( lastMessage.timeStamp )) }
                    </span>
                </div>
                <span className="last-message">{ lastMessage?.content }</span>
            </div> );
        }
    }
    