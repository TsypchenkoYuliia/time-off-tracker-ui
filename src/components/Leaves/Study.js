import React from 'react';

import Approvers from './Approvers';
import LeaveComment from './LeaveComment';
import VacationPeriod from './VacationPeriod';

function Study({
  prManagers,
  isSendingRequest,
  comment,
  changeComment,
  fromDate,
  changeFromDate,
  toDate,
  changeToDate,
  managers,
  changeManagers,
}) {
  return (
    <div>
      <VacationPeriod
        fromDate={fromDate}
        changeFromDate={changeFromDate}
        toDate={toDate}
        changeToDate={changeToDate}
        isSendingRequest={isSendingRequest}
      />

      <LeaveComment disabled={isSendingRequest} comment={comment} changeComment={changeComment} />

      <Approvers
        managers={managers}
        isSendingRequest={isSendingRequest}
        prManagers={prManagers}
        changeManagers={changeManagers}
      />
    </div>
  );
}

export default Study;
