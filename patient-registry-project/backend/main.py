from fastapi import FastAPI, Query, HTTPException, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, computed_field
from typing import Annotated, Literal
import json

app = FastAPI()


# ============================================================
# Pydantic Model
# ============================================================

class Patient(BaseModel):
    id: Annotated[
        str,
        Field(
            description="ID of the patient",
            examples=["P001"]
        )
    ]

    name: Annotated[
        str,
        Field(description="Name of the patient")
    ]

    city: Annotated[
        str,
        Field(description="City where the patient is living")
    ]

    age: Annotated[
        int,
        Field(
            gt=0,
            lt=120,
            description="Age of the patient"
        )
    ]

    gender: Annotated[
        Literal["male", "female", "others"],
        Field(description="Gender of the patient")
    ]

    height: Annotated[
        float,
        Field(
            gt=0,
            description="Height of the patient in centimeters"
        )
    ]

    weight: Annotated[
        float,
        Field(
            gt=0,
            description="Weight in kg"
        )
    ]

    @computed_field
    @property
    def bmi(self) -> float:
        # Calculates BMI using weight and height
        height_in_meters = self.height / 100

        return round(
            self.weight / (height_in_meters ** 2),
            2
        )

    @computed_field
    @property
    def verdict(self) -> str:
        # Generates health status based on calculated BMI
        if self.bmi < 18.5:
            return "Underweight"
        elif self.bmi < 25:
            return "Normal"
        elif self.bmi < 30:
            return "Overweight"
        else:
            return "Obese"


# ============================================================
# Pydantic Model for Update
# ============================================================

class PatientUpdate(BaseModel):

    name: str | None = None

    city: str | None = None

    age: int | None = None

    gender: Literal["male", "female", "others"] | None = None

    height: float | None = None

    weight: float | None = None


# ============================================================
# JSON File Functions
# ============================================================

def load_data():
    with open("patients.json", "r") as f:
        data = json.load(f)
    return data


def save_data(data):
    with open("patients.json", "w") as f:
        json.dump(data, f, indent=4)


# ============================================================
# GET - View All Patients
# ============================================================

@app.get("/view")
def view():
    viewed_data = load_data()
    return viewed_data


# ============================================================
# GET - View Specific Patient
# ============================================================

# Path Parameters
@app.get("/patient/{patient_id}")
def view_patient(
    patient_id: str = Path(
        ...,
        description='ID of the patient in the DB',
        examples=["P001"]
    )
):
    data = load_data()

    if patient_id in data:
        return data[patient_id]

    raise HTTPException(
        status_code=404,
        detail='patient not found'
    )


# ============================================================
# GET - Sort Patients
# ============================================================

#Query Parameters
@app.get("/sort")
def sort_patients(
    sort_by: str = Query(
        ...,
        description="Sort by height, weight, or BMI"
    ),

    # order is optional because by default order ascending. 
    order: str = Query(
        "ascending",
        description="Sort in ascending or descending order"
    )
):

    valid_fields = ["height", "weight", "bmi"]

    # Validate sort field
    if sort_by not in valid_fields:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid field. Select from {valid_fields}"
        )

    # Validate sort order
    if order not in ["ascending", "descending"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid order. Select between ascending and descending"
        )

    data = load_data()

    # Sort patient data
    sorted_data = sorted(
        data.values(),
        key=lambda x: x[sort_by],
        reverse=(order == "descending")
    )

    return sorted_data


# ============================================================
# POST - Create New Patient
# ============================================================

@app.post("/create")
def create_patient(patient: Patient):

    # 1. Load existing data
    data = load_data()

    # 2. Check if ID already exists
    if patient.id in data:
        raise HTTPException(
            status_code=400,
            detail="Patient already exists"
        )

    # 3. Add new patient and save
    # We convert the Pydantic object to a dict, excluding the ID key
    new_record = patient.model_dump(exclude={"id"})

    data[patient.id] = new_record

    save_data(data)

    return JSONResponse(
        status_code=201,
        content={
            "message": "Patient created successfully"
        }
    )


# ============================================================
# PUT - Update Existing Patient
# ============================================================

@app.put("/edit/{patient_id}")
def update_patient(
    patient_id: str = Path(
        ...,
        description="ID of the patient in the DB",
        examples=["P001"]
    ),
    patient_update: PatientUpdate = ...
):

    # 1. Load existing data
    data = load_data()

    # 2. Check if patient exists
    if patient_id not in data:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    # 3. Convert update data to dictionary
    # Only fields provided by the client will be included
    update_data = patient_update.model_dump(exclude_unset=True)

    # 4. Update existing patient data
    data[patient_id].update(update_data)

    # 5. Recalculate BMI and verdict
    # Patient model validates the updated data
    # and automatically calculates BMI and verdict
    updated_patient = Patient(id=patient_id,**data[patient_id])

    # 6. Convert updated Pydantic object to dictionary
    # Exclude ID because it is already used as the dictionary key
    data[patient_id] = updated_patient.model_dump(exclude={"id"})

    # 7. Save updated data
    save_data(data)

    # 8. Return success response
    return JSONResponse(
        status_code=200,
        content={
            "message": "Patient updated successfully"
        }
    )


# ============================================================
# DELETE - Delete Patient
# ============================================================

@app.delete("/delete/{patient_id}")
def delete_patient(patient_id: str):

    # 1. Load existing data
    data = load_data()

    # 2. Check if patient exists
    if patient_id not in data:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    # 3. Delete patient
    del data[patient_id]

    # 4. Save updated data
    save_data(data)

    return JSONResponse(
        status_code=200,
        content={
            "message": "Patient deleted successfully"
        }
    )
