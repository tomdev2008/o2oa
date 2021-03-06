/** 
 *  Generated by OpenJPA MetaModel Generator Tool.
**/

package com.x.attendance.entity;

import com.x.base.core.entity.SliceJpaObject_;
import java.lang.Boolean;
import java.lang.Double;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import javax.persistence.metamodel.SingularAttribute;

@javax.persistence.metamodel.StaticMetamodel
(value=com.x.attendance.entity.AttendanceDetail.class)
@javax.annotation.Generated
(value="org.apache.openjpa.persistence.meta.AnnotationProcessor6",date="Sat May 06 19:33:53 CST 2017")
public class AttendanceDetail_ extends SliceJpaObject_  {
    public static volatile SingularAttribute<AttendanceDetail,String> abnormalDutyDayTime;
    public static volatile SingularAttribute<AttendanceDetail,Double> absence;
    public static volatile SingularAttribute<AttendanceDetail,String> absentDayTime;
    public static volatile SingularAttribute<AttendanceDetail,String> appealDescription;
    public static volatile SingularAttribute<AttendanceDetail,String> appealReason;
    public static volatile SingularAttribute<AttendanceDetail,Integer> appealStatus;
    public static volatile SingularAttribute<AttendanceDetail,String> archiveTime;
    public static volatile SingularAttribute<AttendanceDetail,Double> attendance;
    public static volatile SingularAttribute<AttendanceDetail,String> batchName;
    public static volatile SingularAttribute<AttendanceDetail,String> companyName;
    public static volatile SingularAttribute<AttendanceDetail,Date> createTime;
    public static volatile SingularAttribute<AttendanceDetail,String> cycleMonth;
    public static volatile SingularAttribute<AttendanceDetail,String> cycleYear;
    public static volatile SingularAttribute<AttendanceDetail,String> departmentName;
    public static volatile SingularAttribute<AttendanceDetail,String> description;
    public static volatile SingularAttribute<AttendanceDetail,String> empName;
    public static volatile SingularAttribute<AttendanceDetail,String> empNo;
    public static volatile SingularAttribute<AttendanceDetail,Double> getSelfHolidayDays;
    public static volatile SingularAttribute<AttendanceDetail,String> id;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isAbnormalDuty;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isAbsent;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isGetSelfHolidays;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isHoliday;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isLackOfTime;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isLate;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isLeaveEarlier;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isWeekend;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isWorkOvertime;
    public static volatile SingularAttribute<AttendanceDetail,Boolean> isWorkday;
    public static volatile SingularAttribute<AttendanceDetail,Long> lateTimeDuration;
    public static volatile SingularAttribute<AttendanceDetail,Long> leaveEarlierTimeDuration;
    public static volatile SingularAttribute<AttendanceDetail,String> monthString;
    public static volatile SingularAttribute<AttendanceDetail,String> offDutyTime;
    public static volatile SingularAttribute<AttendanceDetail,String> offWorkTime;
    public static volatile SingularAttribute<AttendanceDetail,String> onDutyTime;
    public static volatile SingularAttribute<AttendanceDetail,String> onWorkTime;
    public static volatile SingularAttribute<AttendanceDetail,Date> recordDate;
    public static volatile SingularAttribute<AttendanceDetail,String> recordDateString;
    public static volatile SingularAttribute<AttendanceDetail,Integer> recordStatus;
    public static volatile SingularAttribute<AttendanceDetail,String> selfHolidayDayTime;
    public static volatile SingularAttribute<AttendanceDetail,String> sequence;
    public static volatile SingularAttribute<AttendanceDetail,Date> updateTime;
    public static volatile SingularAttribute<AttendanceDetail,Long> workOvertimeTimeDuration;
    public static volatile SingularAttribute<AttendanceDetail,Long> workTimeDuration;
    public static volatile SingularAttribute<AttendanceDetail,String> yearString;
}
