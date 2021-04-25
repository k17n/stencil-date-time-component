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
        const currentLocaleString = new Date(time).toLocaleString(this.locale, { timeZone: timeZone });

        // Get date string based on generated locale time 
        const DateString = new Date(currentLocaleString);

        // Get the hours, minutes and seconds from the date string
        const hours = DateString.getHours();
        const minutes = DateString.getMinutes();
        const seconds = DateString.getSeconds();

        // Calculating the rotating fraction --> how many fraction to rotate for each hand.
        const secondsFraction = seconds / 60;
        const minutesFraction = (secondsFraction + minutes) / 60;
        const hoursFraction = (minutesFraction + hours) / 12;

        // Degrees to Rotate
        const secondsRotate = secondsFraction * 360;
        const minutesRotate = minutesFraction * 360;
        const hoursRotate = hoursFraction * 360;

        // Generate CSS Transform style
        let clockHandStyles = {
            secondHand: `rotate(${secondsRotate}deg)`,
            minuteHand: `rotate(${minutesRotate}deg)`,
            hourHand: `rotate(${hoursRotate}deg)`
        }

        return clockHandStyles;
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
