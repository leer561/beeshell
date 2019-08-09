/**
 * 获取日历面板
 * 参数为某天的日期
 */
declare function getCalendar(date: any): any[][];
/**
 * 获取星期的文案
 * ['日', '一', '二', ....]
 */
declare function getWeekdays(calendar: any): any;
declare function changeDate(date: any, type: any, method: any): any;
declare const _default: {
    CalendarDecorator: {
        trigger(calendar: any): (decorator: any) => any;
        decorator: {
            targetMonth(date: any, item: any): void;
            disabled(startDate: any, endDate: any, item: any): void;
        };
    };
    getCalendar: typeof getCalendar;
    getWeekdays: typeof getWeekdays;
    changeDate: typeof changeDate;
};
export default _default;
