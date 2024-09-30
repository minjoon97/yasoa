export interface keywordSearchType {
  addr1: string;
  addr2: string;
  areacode: string;
  contentid: string;
  contenttypeid: string;
  firstimage: string;
  firstimage2: string;
  tel: string;
  title: string;
}

export interface festivalCombinedData extends keywordSearchType {
  commonData: {
    title: string;
    tel: string;
    homepage: string;
    firstimage: string;
    firstimage2: string;
    overview: string;
  };
  introData: {
    sponsor1: string;
    sponsor1tel: string;
    eventstartdate: string;
    eventenddate: string;
    eventplace: string;
    usetimefestival: string;
  };
}

export interface lodgmentCombinedData extends keywordSearchType {
  commonData: {
    title: string;
    tel: string;
    homepage: string;
    firstimage: string;
    firstimage2: string;
    overview: string;
  };
  introData: {
    roomcount: string;
    roomtype: string;
    checkintime: string;
    checkouttime: string;
    chkcooking: string;
    pickup: string;
    parkinglodging: string;
  };
}

export interface attractionCombinedData extends keywordSearchType {
  commonData: {
    title: string;
    tel: string;
    homepage: string;
    firstimage: string;
    firstimage2: string;
    overview: string;
  };
  introData: {
    infocenter: string;
    restdate: string;
    usetime: string;
    parking: string;
    chkbabycarriage: string;
    chkcreditcard: string;
  };
}
