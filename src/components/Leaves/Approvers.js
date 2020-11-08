import React from 'react';
import DoneIcon from '@material-ui/icons/Done';

import Signers from './Signers';

function Approvers({ managers, isSendingRequest, prManagers, changeManagers }) {
  const mapping = React.useCallback(
    (managers) => {
      return (
        <>
          {managers.map((manager, idx) => {
            return (
              <div
                key={`div-icon-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <DoneIcon
                  key={`done-icon-${idx}`}
                  className="done-icon"
                  style={{
                    marginTop: '5px',
                  }}
                />
                <Signers
                  key={`sign-idx-${idx}`}
                  idx={idx}
                  options={prManagers}
                  managers={managers}
                  onChange={changeManagers}
                  isDisabled={isSendingRequest}
                />
              </div>
            );
          })}
        </>
      );
    },
    [isSendingRequest],
  );

  return (
    <div>
      <h3>Approvers</h3>
      <ol className="approvers__list">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DoneIcon className="done-icon" />
          <li>Accounting</li>
        </div>
        {managers && mapping(managers)}
      </ol>
    </div>
  );
}

export default Approvers;
