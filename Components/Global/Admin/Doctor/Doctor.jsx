import React, { useEffect, useState } from "react";

//INTERNAL IMPORT

import Header from "../../Regular/Table/Header";
import Table from "./Table";
import AddDoctor from "./AddDoctor";
import { useStateContext } from "../../../../Context/index";

import { GET_ALL_REGISTERED_DOCTORS } from "../../../../Context/constants";

const Doctor = ({ setOpenComponent, setDoctorDetails }) => {
  const { CHECKI_IF_CONNECTED_LOAD, address } = useStateContext();
  const [registerDoctors, setRegisterDoctors] = useState();
  const [registerDoctorsCopy, setRegisterDoctorsCopy] = useState();
  const tableHead = [
    {
      name: "#ID",
    },
    {
      name: "Specialist",
    },
    {
      name: "Doctor Name",
    },
    {
      name: "Email ID",
    },
    {
      name: "Appointment",
    },
    {
      name: "Contact",
    },
    {
      name: "Status",
    },
  ];

  const doctors = [];

  useEffect(() => {
    const fetchData = async () => {
      const address = await CHECKI_IF_CONNECTED_LOAD();
      if (address) {
        GET_ALL_REGISTERED_DOCTORS().then((doctors) => {
          console.log(doctors);
          setRegisterDoctors(doctors);
          setRegisterDoctorsCopy(doctors);
        });
      }
    };

    fetchData();
  }, [address]);

  //FILTER
  const onHandleSearch = (value) => {
    const filteredNFTS = registerDoctors.filter(({ firstName }) =>
      firstName.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setRegisterDoctors(registerDoctorsCopy);
    } else {
      setRegisterDoctors(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (registerDoctors?.length && registerDoctorsCopy.length) {
      setRegisterDoctors(registerDoctorsCopy);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <Header
          name={"Doctors List"}
          onClearSearch={onClearSearch}
          onHandleSearch={onHandleSearch}
        />

        <div className="row">
          <div className="col-xl-12">
            <div className="table-responsive">
              <Table
                thead={tableHead}
                tableData={registerDoctors}
                name={"doctor"}
                setOpenComponent={setOpenComponent}
                setDoctorDetails={setDoctorDetails}
              />
            </div>
          </div>
        </div>
      </div>
      <AddDoctor />
    </>
  );
};

export default Doctor;
