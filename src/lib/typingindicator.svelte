<span class="typingIndicatorBubble">
    <span class="typingIndicatorBubbleDot" />
    <span class="typingIndicatorBubbleDot" />
    <span class="typingIndicatorBubbleDot" />
</span>

<style>
    .typingIndicatorBubble {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: inherit;
    }

    .typingIndicatorBubbleDot {
        width: 4px;
        height: 4px;
        margin-right: 4px;
        background-color: currentColor;
        border-radius: 50%;
        animation-name: bounce;
        animation-duration: 0.75s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    .typingIndicatorBubbleDot:first-of-type {
        margin: 0px 4px;
    }

    .typingIndicatorBubbleDot:nth-of-type(2) {
        animation-delay: 0.15s;
    }

    .typingIndicatorBubbleDot:nth-of-type(3) {
        animation-delay: 0.3s;
    }

    @keyframes bounce {
        0%,
        60%,
        100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-4px);
        }
    }
</style>
