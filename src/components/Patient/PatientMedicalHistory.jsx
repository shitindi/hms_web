import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getJSDateFromDb } from "../../Utilities/DateTime";

export default function PatientMedicalHistory({ historyData }) {

  const visits = !(historyData && historyData.length) ? []
    :
    historyData.map(history => {
      const contact = history?.Doctor?.User?.Contact
      let tests = [] 
      let medics = []
      if ( history?.Prescription && history?.Prescription?.length > 0){
        history.Prescription.forEach(med => medics.push(med.Medicine.name))
      }else{
        medics.push('No prescription')
      }

      if (  history?.LabReqests &&  history?.LabReqests?.length  > 0){
          history.LabReqests.forEach( req => tests.push(req.TestCatalog.test_name))
      }else{
        tests.push('No test')
      }
      return {

        appointmentDate: getJSDateFromDb( history?.appointment_date).toDateString(),
        complaint: history?.appointment_reason,
        doctorName: 'Dr. ' + contact?.first_name + ', ' + contact.last_name,
        department: history?.Department.name,
        doctorSuggestion: 'Will be implemented',
        labTests: tests,
        medicines:medics,
      }
    }
    )


  // [
  //   {
  //     appointmentDate: "27 Mar 2026",
  //     complaint: "Fever, headache, and body weakness for 2 days",
  //     doctorName: "Dr. Michael",
  //     department: "General Medicine",
  //     doctorSuggestion:
  //       "Start antimalarial treatment, encourage hydration, and schedule follow-up after medication completion.",
  //     labTests: ["Malaria Rapid Test", "Full Blood Count"],
  //     medicines: ["Artemether/Lumefantrine", "Paracetamol 500mg"],
  //   },

  // ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {visits.map((visit, index) => (
        <Accordion key={index} disableGutters sx={{ borderRadius: 3, overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography fontWeight={700}>
                {visit.appointmentDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {visit.complaint}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Doctor Name
                    </Typography>
                    <Typography variant="body1">{visit.doctorName}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Department
                    </Typography>
                    <Typography variant="body1">{visit.department}</Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Complaint
                    </Typography>
                    <Typography variant="body1">{visit.complaint}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Doctor Suggestion
                    </Typography>
                    <Typography variant="body1">
                      {visit.doctorSuggestion}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                      Lab Tests
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {visit.labTests.map((test, i) => (
                        <Chip
                          key={i}
                          label={test}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                      Medicine Prescribed
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {visit.medicines.map((medicine, i) => (
                        <Chip
                          key={i}
                          label={medicine}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}