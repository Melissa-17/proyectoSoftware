import moment from 'moment';
import { Buffer } from "buffer";

export const getScore = (score) => {
    return score === null ? '--' : score;
}

export const formatDate = (date, format, rTZ) => {
    const removeTZ = rTZ ? rTZ : false;
    const dateToFormat = removeTZ ? date.toString().slice(0,23) : date;
    const formatString = format ? format : 'DD/MM/YYYY';
    let formattedDate = new Date(dateToFormat);
                
    formattedDate = moment(formattedDate).format(formatString);
    return formattedDate;
}

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const formatAssignmentName = (index, type) =>  {
    let index2 = index ? index : '';
    if (type === 'FINAL ASSIGN') {
        return 'Entregable Final ' + index2;
    } else if (type === 'PARTIAL ASSIGN') {
        return 'Entregable Parcial ' + index2;
    } else if (type === 'EXPOSITION') {
        return 'Exposicion ' + index2;
    } else if (type === 'ADVANCE') {
        return 'Avance ' + index2;
    }
}

export const removeAccents = (str) => {
    // return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

export const getUserPhoto = (photo) => {
    return photo ? (
        <img
          className="profile-img"
          src={`data:image/png;base64,${Buffer.from(
            photo.data
          ).toString("base64")}`}
          alt="profile-pic"
        />
      ) : (
        <img
          className="profile-img"
          // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          src="https://wallpapercave.com/uwp/uwp2417748.png"
          alt="foto asesor"
        />
      )
}