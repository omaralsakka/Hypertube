import { Movie } from '../types/appTypes';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import InputRange from 'react-input-range';
import { useState } from 'react';

const FilterControls = ({ movie }: { movie: Movie }) => {
	const [ranges, setRanges] = useState({
		ageValues: {
			min: 21,
			max: 41,
		},
		fameValues: {
			min: 20,
			max: 60,
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Form.Group className="mb-5">
				<Form.Label className="fs-5">Gap of production year</Form.Label>

				<div class="range">
					<input type="range" class="form-range" id="customRange1" />
				</div>
				<div>
					<Form.Label className="fs-5">Order By</Form.Label>
					<div
						class="btn-group shadow-0"
						role="group"
						aria-label="Basic example"
					>
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-mdb-color="dark"
						>
							Asc
						</button>
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-mdb-color="dark"
						>
							Desc
						</button>
					</div>
				</div>
				<div>
					<Form.Label className="fs-5">Sort By</Form.Label>
					<select class="form-select" aria-label="Default select example">
						title, year, rating, peers, seeds, download_count, like_count,
						date_added
						<option selected>title</option>
						<option value="1">year</option>
						<option value="2">rating</option>
						<option value="3">Three</option>
					</select>
				</div>
				<div>Quality</div>
				<div> Genre:</div>
				<label class="form-label" for="customRange1">
					Imdb grade:
				</label>
				<div class="range">
					<input type="range" class="form-range" id="customRange1" />
				</div>
			</Form.Group>
		</>
	);
};

export default FilterControls;
/*
sort_by		String ()	date_added	Sorts the results by choosen value
order_by		String (desc, asc)

quality		String (720p, 1080p, 2160p, 3D)
limit		Integer between 1 - 50 (inclusive)
The page will be sortable and filtered according to criteria such as name, genre, the
IMDb grade, the gap of production year etc...

name
genre
imdb grade
gap of production year

 <Container className="signup-container mt-5 mb-3 w-50 ">
        <h1 className="text-center">Advanced search</h1>
        <hr />
        {alert && (
          <Alert
            variant="success"
            className="location-alert location-alert-success text-center"
          >
            Settings have been saved
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-5">
            <Form.Label className="fs-5">Age range</Form.Label>
            <div className="mt-4 w-50">
              <InputRange
                maxValue={61}
                minValue={18}
                formatLabel={(value) => `${value}`}
                value={ranges.ageValues}
                onChange={(value) => setRanges({ ...ranges, ageValues: value })}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="fs-5">Fame rating gap</Form.Label>
            <div className="mt-4 w-50">
              <InputRange
                maxValue={100}
                minValue={0}
                formatLabel={(value) => `${value}`}
                value={ranges.fameValues}
                onChange={(value) =>
                  setRanges({ ...ranges, fameValues: value })
                }
              />
            </div>
          </Form.Group>

		  <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
			<Form.Select {...country}>
				<option value="">...</option>
				{countries.map(country => <option key={country} value={country}>{country}</option>)}
			</Form.Select>
			<Form.Text>If you choose to use this option your search will be placed to the capital city of the chosen country!</Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Tags</Form.Label>
            <InputTags
              maxLength={50}
              values={tags}
              onTags={(value) => setTags(value.values)}
            />
            <Form.Text muted>max length 50 characters</Form.Text>
          </Form.Group>
          <div className="d-flex" style={{ gap: "10px" }}>
            <Button type="submit" >Save</Button>
			<Button onClick={setDefault}>Set all to default</Button>
          </div>
        </Form>
      </Container>
*/
