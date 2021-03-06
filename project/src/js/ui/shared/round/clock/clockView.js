import * as helper from '../../../helper';

function prefixInteger(num, length) {
  return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

const sepHigh = ':';
const sepLow = ' ';

export function formatClockTime(time, isRunning) {
  var date = new Date(time);
  var minutes = prefixInteger(date.getUTCMinutes(), 2);
  var seconds = prefixInteger(date.getUTCSeconds(), 2);
  var tenths = Math.floor(date.getUTCMilliseconds() / 100);
  let pulse = (isRunning && tenths < 5) ? sepLow : sepHigh;

  if (time < 10000) {
    return seconds + '.' + tenths;
  }

  if (time >= 3600000) {
    let hours = prefixInteger(date.getUTCHours(), 1);
    return hours + pulse + minutes;
  }

  return minutes + sepHigh + seconds;
}

export function view(ctrl, color, runningColor, isBerserk) {
  const time = ctrl.data[color];
  const isRunning = runningColor === color;
  const className = helper.classSet({
    clock: true,
    outoftime: !time,
    running: isRunning,
    emerg: time < ctrl.data.emerg,
    berserk: isBerserk
  });
  function cOnCreate(vnode) {
    const el = vnode.dom;
    el.textContent = formatClockTime(time * 1000, isRunning);
    ctrl.els[color] = el;
  }
  return (
    <div className={className} oncreate={cOnCreate} />
  );
}
