import { Component, Prop, h } from '@stencil/core';
@Component({
    tag: 'analog-clock',
    styleUrl: 'analog-clock.scss',
    shadow: true,
})
export class analogClock {
    /**
    *  Time to be displayed in the clock.
    */
    @Prop() time: number = Date.now();

    /**
    *  Timezone in which the date and time should be shown. Default is browser timezone.
    */
    @Prop() timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    private locale: string = Intl.DateTimeFormat().resolvedOptions().locale;

    private getClockHandStyles(time: number, timeZone: string): any {

        // Get current locale time based on given timezone
        const currentLocaleTimeString = new Date(time).toLocaleTimeString(this.locale, { timeZone: timeZone });

        // Format the locale time string by splitting and padding different time units. Value is returned as JSON.
        const formattedLocaleTime = this.formatTime(currentLocaleTimeString);

        // Convert the hours, minutes and seconds into numbers from string in formattedLocaleTime JSON
        const hours = parseInt(formattedLocaleTime.hours);
        const minutes = parseInt(formattedLocaleTime.minutes);
        const seconds = parseInt(formattedLocaleTime.seconds);

        // Calculating the rotating fraction --> how many fraction to rotate for each hand.
        const secondsFraction = seconds / 60;
        const minutesFraction = (secondsFraction + minutes) / 60;
        const hoursFraction = (minutesFraction + hours) / 12;

        // Degrees to Rotate
        const secondsRotate = secondsFraction * 360;
        const minutesRotate = minutesFraction * 360;
        const hoursRotate = hoursFraction * 360;

        // Generate CSS Transform style
        const clockHandStyles = {
            secondHand: `rotate(${secondsRotate}deg)`,
            minuteHand: `rotate(${minutesRotate}deg)`,
            hourHand: `rotate(${hoursRotate}deg)`
        }

        return clockHandStyles;
    }

    private formatTime(timeString: string) {
        // Occurence of first ':' in the time string
        const firstSplitIndex = timeString.indexOf(':')

        // Occurence of second ':' in the time string
        const secondSplitIndex = timeString.indexOf(':', firstSplitIndex + 1)

        // Occurence of space ' ' in the time string. It will be used to delimit the string and omit the AM/PM part
        const delimitIndex = timeString.indexOf(' ');
        
        let formattedTime = {
            hours: '',
            minutes: '',
            seconds: ''
        }
        formattedTime.hours = this.padTimeString(timeString.substring(0, firstSplitIndex));
        formattedTime.minutes = this.padTimeString(timeString.substring(firstSplitIndex + 1, secondSplitIndex));
        formattedTime.seconds = this.padTimeString(timeString.substring(secondSplitIndex + 1, delimitIndex));
        return formattedTime;
    }

    private padTimeString(timeString: string) {
        if (timeString.length == 1) {
            return `0${timeString}`
        }
        else {
            return timeString
        }
    }

    render() {
        const clockHandStyles = this.getClockHandStyles(this.time, this.timeZone);
        return (
            <div class="clock">
                <div class="clock__hand clock__hand--hour" style={{ transform: `translateX(-50%) ${clockHandStyles.hourHand}` }}></div>
                <div class="clock__hand clock__hand--minute" style={{ transform: `translateX(-50%) ${clockHandStyles.minuteHand}` }}></div>
                <div class="clock__hand clock__hand--second" style={{ transform: `translateX(-50%) ${clockHandStyles.secondHand}` }}></div>
            </div>
        );
    }
}
