'use strict';
(function (window, $) {
    function AsanaStorypointCounter() {
        /* Settings */
        var eventNamespace = '.asanaCounter';
        var taskNameInputSelector = '.TaskName-input';
        var taskItemSelector = '.ItemRow--highlighted, .ItemRow--focused';
        var multiTaskTitleSelector = '.MultiTaskTitleRow-titleText';

        /**
         * Binds calculation to events
         */
        function bind() {
            $(document).on('keyup mouseup' + eventNamespace, taskNameInputSelector, countAndDisplay);
        }

        /**
         * Scans dom for selected task inputs
         * @returns {*|jQuery|HTMLElement}
         */
        function getListOfSelectedTasks() {
            return $(taskNameInputSelector, taskItemSelector);
        }

        /**
         * Extracts story point sum from task inputs list
         * @param $listOfTasksInputs
         * @returns {number}
         */
        function countStoryPoints($listOfTasksInputs) {
            var sum = 0;
            $listOfTasksInputs.each(function (index, taskNameInput) {
                sum += getStorypointValue($(taskNameInput).val());
            });

            return sum;
        }

        /**
         * Extract number from task name
         * @param taskName
         * @returns {number}
         */
        function getStorypointValue(taskName) {
            var matches = String(taskName).match(/\[(\d+([.,]\d+)?)\]\s*$/); // Match number in square brackets i.e. [1] and [1.1]
            var result = 0;
            if (matches) {
                result = matches[1];
            }
            return Number(result);
        }

        /**
         * Displays result to user
         * @param content
         */
        function display(content) {
            var $titleElement = $(multiTaskTitleSelector);
            var titleText;
            /* Cache original title to use when multiple events fired */
            if ($titleElement.data('originalTitle')) {
                titleText = $titleElement.data('originalTitle');
            } else {
                titleText = $titleElement.text();
                $titleElement.data('originalTitle', titleText);
            }
            titleText = titleText
                .concat(' [')
                .concat(content)
                .concat(']')
            ;
            $titleElement.text(titleText);
        }

        /**
         * Call this function to execute
         */
        function countAndDisplay() {
            var $listOfTasks = getListOfSelectedTasks();
            display(countStoryPoints($listOfTasks));
        }

        /* Constructor */
        bind();
    }

    var asanaStorypointCounter = asanaStorypointCounter || new AsanaStorypointCounter();
})(window, jQuery);
