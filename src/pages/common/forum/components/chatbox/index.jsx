import React from 'react';

export const ChatBox = ({ message }) => {
    const emailRegex = /\*([^*]+)\*/g;

  // Split the message into parts based on the email placeholders
    const messageParts = message.split(emailRegex);

  // Map through the parts and apply different styling to emails
    const formattedMessage = messageParts.map((part, index) => {
        if (index % 2 === 1) {
        // This is an email, apply a different color
        return (
            <span key={index} style={{ color: 'blue' }}>
            @{part}
            </span>
        );
        } else {
        // This is regular text
        return <span key={index}>{part}</span>;
        }
    });


    return <div>{formattedMessage}</div>;
    };
