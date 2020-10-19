import React from 'react';

import Approvers from './Approvers';
import LeaveComment from './LeaveComment';
import VacationPeriod from './VacationPeriod';

function SickWithDoc({
  isSendingRequest,
  comment,
  changeComment,
  fromDate,
  changeFromDate,
  toDate,
  changeToDate,
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

      <Approvers />
    </div>
  );
}

export default SickWithDoc;
