﻿declare module porcelain {
    /**
    * A component for displaying readonly text.
    *
    * @class
    */
    class Label extends Component {
        /**
        * Returns the text displayed as the inner html of the label.
        */
        public text(): string;
        /**
        * Set the text displayed in the label.
        */
        public setText(value: string): void;
    }
}