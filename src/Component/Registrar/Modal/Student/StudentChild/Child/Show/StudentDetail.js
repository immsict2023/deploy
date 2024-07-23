import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function StudentDetail() {

    const [edit_mode_status, setEdit_Mode_Status] = useState(false)

  return (
    <>
      <div>
        <div className='container-fluid text-center'>
            <h5>STUDENT INFORMATION</h5>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Student ID</b></td>
                    <td>{edit_mode_status ? <input type='text' placeholder='2019-321145' className='form-control border-0' name='student_id' id='student_id' /> : '2019-321145'}</td>
                    <td><b>Active</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select defaultValue={'YES'} name='active' id='active' className='form-control border-0'>
                                <option></option>
                                <option value={'YES'}>YES</option>
                                <option value={'NO'}>NO</option>
                            </select>
                            :
                            'YES'
                        }
                    </td>
                    <td><b>Date Admitted</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='date' className='form-control border-0' name='date_admitted' id='date_admitted' />
                            :
                            '01/01/2000'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>First Name</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='first_name' id='first_name' />
                            :
                            'Luffy'
                        }
                    </td>
                    <td><b>Last Name</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='last_name' id='last_name' />
                            :
                            'Monkey'
                        }
                    </td>
                    <td><b>Date Graduated</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='date' className='form-control border-o' name='date_graduated' id='date_gradia' />
                            :
                            '01/01/2000'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Middle Name</b></td>
                    <td>
                        {
                            edit_mode_status ? 
                            <input type='text' className='form-control border-0' name='middle_name' id='middle_name' />
                            :
                            'D.'
                        }
                    </td>
                    <td><b>Suffix</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='suffix' id='suffix' >
                                <option value={''}></option>
                                <option value={'JR'}></option>
                                <option value={'SR'}>SR</option>
                                <option value={'II'}>II</option>
                                <option value={'III'}>III</option>
                                <option value={'IV'}>IV</option>
                                <option value={'V'}>V</option>
                            </select>
                            :
                            ''
                        }
                    </td>
                    <td><b>Program</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='program' id='program'>
                                <option></option>
                            </select>
                            :
                            'Pirate'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Date of Birth</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='date' className='form-control border-0' name='date_of_birth' id='date_of_birth' />
                            :
                            '23/09/2002'
                        }
                    </td>
                    <td><b>Place of Birth</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='place_of_birth' id='place_of_birth' />
                            :
                            'Grandline'
                        }
                    </td>
                    <td><b>Year Level</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='year_level' id='year_level'>
                                <option></option>
                                <option value={'First Year'}>First Year</option>
                                <option value={'Second Year'}>Second Year</option>
                                <option value={'Third Year'}>Third Year</option>
                                <option value={'Fourth Year'}>Fourth Year</option>
                            </select>
                            :
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Gender</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='gender' id='gender'>
                                <option></option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                                <option></option>
                            </select>
                            :
                            'Male'
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Marital Status</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='marital_status' id='marital_status'>
                                <option></option>
                                <option value='Single'>Single</option>
                                <option value='Married'>Married</option>
                                <option value='Widowed'>Widowed</option>
                                <option value='Divorced'>Divorced</option>
                                <option value='Separated'>Separated</option>
                            </select>
                            :
                            'Single'
                        }
                    </td>
                    <td><b>Nationality</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <select className='form-control border-0' name='nationality' id='nationality'>
                                <option></option>
                                <option value='Afghanistan'>Afghanistan</option>
                                <option value='Aland Islands'>Aland Islands</option>
                                <option value='Albania'>Albania</option>
                                <option value='Algeria'>Algeria</option>
                                <option value='American Samoa'>American Samoa</option>
                                <option value='Andorra'>Andorra</option>
                                <option value='Angola'>Angola</option>
                                <option value='Anguilla'>Anguilla</option>
                                <option value='Antarctica'>Antarctica</option>
                                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                                <option value='Argentina'>Argentina</option>
                                <option value='Armenia'>Armenia</option>
                                <option value='Aruba'>Aruba</option>
                                <option value='Australia'>Australia</option>
                                <option value='Austria'>Austria</option>
                                <option value='Azerbaijan'>Azerbaijan</option>
                                <option value='Bahamas'>Bahamas</option>
                                <option value='Bahrain'>Bahrain</option>
                                <option value='Bangladesh'>Bangladesh</option>
                                <option value='Barbados'>Barbados</option>
                                <option value='Belarus'>Belarus</option>
                                <option value='Belgium'>Belgium</option>
                                <option value='Belize'>Belize</option>
                                <option value='Benin'>Benin</option>
                                <option value='Bermuda'>Bermuda</option>
                                <option value='Bhutan'>Bhutan</option>
                                <option value='Bolivia, Plurinational State of'>Bolivia, Plurinational State of</option>
                                <option value='Bonaire, Sint Eustatius and Saba'>Bonaire, Sint Eustatius and Saba</option>
                                <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                                <option value='Botswana'>Botswana</option>
                                <option value='Bouvet Island'>Bouvet Island</option>
                                <option value='Brazil'>Brazil</option>
                                <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                                <option value='Brunei Darussalam'>Brunei Darussalam</option>
                                <option value='Bulgaria'>Bulgaria</option>
                                <option value='Burkina Faso'>Burkina Faso</option>
                                <option value='Burundi'>Burundi</option>
                                <option value='Cambodia'>Cambodia</option>
                                <option value='Cameroon'>Cameroon</option>
                                <option value='Canada'>Canada</option>
                                <option value='Cape Verde'>Cape Verde</option>
                                <option value='Cayman Islands'>Cayman Islands</option>
                                <option value='Central African Republic'>Central African Republic</option>
                                <option value='Chad'>Chad</option>
                                <option value='Chile'>Chile</option>
                                <option value='China'>China</option>
                                <option value='Christmas Island'>Christmas Island</option>
                                <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
                                <option value='Colombia'>Colombia</option>
                                <option value='Comoros'>Comoros</option>
                                <option value='Congo'>Congo</option>
                                <option value='Congo, The Democratic Republic of the'>Congo, The Democratic Republic of the</option>
                                <option value='Cook Islands'>Cook Islands</option>
                                <option value='Costa Rica'>Costa Rica</option>
                                <option value='Cote d`Ivoire'>Cote d Ivoire</option>
                                <option value='Croatia'>Croatia</option>
                                <option value='Cuba'>Cuba</option>
                                <option value='Curaçao'>Curaçao</option>
                                <option value='Cyprus'>Cyprus</option>
                                <option value='Czech Republic'>Czech Republic</option>
                                <option value='Denmark'>Denmark</option>
                                <option value='Djibouti'>Djibouti</option>
                                <option value='Dominica'>Dominica</option>
                                <option value='Dominican Republic'>Dominican Republic</option>
                                <option value='Ecuador'>Ecuador</option>
                                <option value='Egypt'>Egypt</option>
                                <option value='El Salvador'>El Salvador</option>
                                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                                <option value='Eritrea'>Eritrea</option>
                                <option value='Estonia'>Estonia</option>
                                <option value='Ethiopia'>Ethiopia</option>
                                <option value='Falkland Islands (Malvinas)'>Falkland Islands (Malvinas)</option>
                                <option value='Faroe Islands'>Faroe Islands</option>
                                <option value='Fiji'>Fiji</option>
                                <option value='Finland'>Finland</option>
                                <option value='France'>France</option>
                                <option value='French Guiana'>French Guiana</option>
                                <option value='French Polynesia'>French Polynesia</option>
                                <option value='French Southern Territories'>French Southern Territories</option>
                                <option value='Gabon'>Gabon</option>
                                <option value='Gambia'>Gambia</option>
                                <option value='Georgia'>Georgia</option>
                                <option value='Germany'>Germany</option>
                                <option value='Ghana'>Ghana</option>
                                <option value='Gibraltar'>Gibraltar</option>
                                <option value='Greece'>Greece</option>
                                <option value='Greenland'>Greenland</option>
                                <option value='Grenada'>Grenada</option>
                                <option value='Guadeloupe'>Guadeloupe</option>
                                <option value='Guam'>Guam</option>
                                <option value='Guatemala'>Guatemala</option>
                                <option value='Guernsey'>Guernsey</option>
                                <option value='Guinea'>Guinea</option>
                                <option value='Guinea-Bissau'>Guinea-Bissau</option>
                                <option value='Guyana'>Guyana</option>
                                <option value='Haiti'>Haiti</option>
                                <option value='Heard Island and McDonald Islands'>Heard Island and McDonald Islands</option>
                                <option value='Holy See (Vatican City State)'>Holy See (Vatican City State)</option>
                                <option value='Honduras'>Honduras</option>
                                <option value='Hong Kong'>Hong Kong</option>
                                <option value='Hungary'>Hungary</option>
                                <option value='Iceland'>Iceland</option>
                                <option value='India'>India</option>
                                <option value='Indonesia'>Indonesia</option>
                                <option value='Iran, Islamic Republic of'>Iran, Islamic Republic of</option>
                                <option value='Iraq'>Iraq</option>
                                <option value='Ireland'>Ireland</option>
                                <option value='Isle of Man'>Isle of Man</option>
                                <option value='Israel'>Israel</option>
                                <option value='Italy'>Italy</option>
                                <option value='Jamaica'>Jamaica</option>
                                <option value='Japan'>Japan</option>
                                <option value='Jersey'>Jersey</option>
                                <option value='Jordan'>Jordan</option>
                                <option value='Kazakhstan'>Kazakhstan</option>
                                <option value='Kenya'>Kenya</option>
                                <option value='Kiribati'>Kiribati</option>
                                <option value='Korea, Republic of'>Korea, Republic of</option>
                                <option value='Kuwait'>Kuwait</option>
                                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                                <option value='Lao Peoples Democratic Republic'>Lao Peoples Democratic Republic</option>
                                <option value='Latvia'>Latvia</option>
                                <option value='Lebanon'>Lebanon</option>
                                <option value='Lesotho'>Lesotho</option>
                                <option value='Liberia'>Liberia</option>
                                <option value='Libya'>Libya</option>
                                <option value='Liechtenstein'>Liechtenstein</option>
                                <option value='Lithuania'>Lithuania</option>
                                <option value='Luxembourg'>Luxembourg</option>
                                <option value='Macao'>Macao</option>
                                <option value='Macedonia, Republic of'>Macedonia, Republic of</option>
                                <option value='Madagascar'>Madagascar</option>
                                <option value='Malawi'>Malawi</option>
                                <option value='Malaysia'>Malaysia</option>
                                <option value='Maldives'>Maldives</option>
                                <option value='Mali'>Mali</option>
                                <option value='Malta'>Malta</option>
                                <option value='Marshall Islands'>Marshall Islands</option>
                                <option value='Martinique'>Martinique</option>
                                <option value='Mauritania'>Mauritania</option>
                                <option value='Mauritius'>Mauritius</option>
                                <option value='Mayotte'>Mayotte</option>
                                <option value='Mexico'>Mexico</option>
                                <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option>
                                <option value='Moldova, Republic of'>Moldova, Republic of</option>
                                <option value='Monaco'>Monaco</option>
                                <option value='Mongolia'>Mongolia</option>
                                <option value='Montenegro'>Montenegro</option>
                                <option value='Montserrat'>Montserrat</option>
                                <option value='Morocco'>Morocco</option>
                                <option value='Mozambique'>Mozambique</option>
                                <option value='Myanmar'>Myanmar</option>
                                <option value='Namibia'>Namibia</option>
                                <option value='Nauru'>Nauru</option>
                                <option value='Nepal'>Nepal</option>
                                <option value='Netherlands'>Netherlands</option>
                                <option value='New Caledonia'>New Caledonia</option>
                                <option value='New Zealand'>New Zealand</option>
                                <option value='Nicaragua'>Nicaragua</option>
                                <option value='Niger'>Niger</option>
                                <option value='Nigeria'>Nigeria</option>
                                <option value='Niue'>Niue</option>
                                <option value='Norfolk Island'>Norfolk Island</option>
                                <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                                <option value='Norway'>Norway</option>
                                <option value='Oman'>Oman</option>
                                <option value='Pakistan'>Pakistan</option>
                                <option value='Palau'>Palau</option>
                                <option value='Palestinian Territory, Occupied'>Palestinian Territory, Occupied</option>
                                <option value='Panama'>Panama</option>
                                <option value='Papua New Guinea'>Papua New Guinea</option>
                                <option value='Paraguay'>Paraguay</option>
                                <option value='Peru'>Peru</option>
                                <option value='Philippines'>Philippines</option>
                                <option value='Pitcairn'>Pitcairn</option>
                                <option value='Poland'>Poland</option>
                                <option value='Portugal'>Portugal</option>
                                <option value='Puerto Rico'>Puerto Rico</option>
                                <option value='Qatar'>Qatar</option>
                                <option value='Réunion'>Réunion</option>
                                <option value='Romania'>Romania</option>
                                <option value='Russian Federation'>Russian Federation</option>
                                <option value='Rwanda'>Rwanda</option>
                                <option value='Saint Barthélemy'>Saint Barthélemy</option>
                                <option value='Saint Helena, Ascension and Tristan da Cunha'>Saint Helena, Ascension and Tristan da Cunha</option>
                                <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                                <option value='Saint Lucia'>Saint Lucia</option>
                                <option value='Saint Martin (French part)'>Saint Martin (French part)</option>
                                <option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option>
                                <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option>
                                <option value='Samoa'>Samoa</option>
                                <option value='San Marino'>San Marino</option>
                                <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                                <option value='Saudi Arabia'>Saudi Arabia</option>
                                <option value='Senegal'>Senegal</option>
                                <option value='Serbia'>Serbia</option>
                                <option value='Seychelles'>Seychelles</option>
                                <option value='Sierra Leone'>Sierra Leone</option>
                                <option value='Singapore'>Singapore</option>
                                <option value='Sint Maarten (Dutch part)'>Sint Maarten (Dutch part)</option>
                                <option value='Slovakia'>Slovakia</option>
                                <option value='Slovenia'>Slovenia</option>
                                <option value='Solomon Islands'>Solomon Islands</option>
                                <option value='Somalia'>Somalia</option>
                                <option value='South Africa'>South Africa</option>
                                <option value='South Georgia and the South Sandwich Islands'>South Georgia and the South Sandwich Islands</option>
                                <option value='Spain'>Spain</option>
                                <option value='Sri Lanka'>Sri Lanka</option>
                                <option value='Sudan'>Sudan</option>
                                <option value='Suriname'>Suriname</option>
                                <option value='South Sudan'>South Sudan</option>
                                <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                                <option value='Swaziland'>Swaziland</option>
                                <option value='Sweden'>Sweden</option>
                                <option value='Switzerland'>Switzerland</option>
                                <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                                <option value='Taiwan, Province of China'>Taiwan, Province of China</option>
                                <option value='Tajikistan'>Tajikistan</option>
                                <option value='Tanzania, United Republic of'>Tanzania, United Republic of</option>
                                <option value='Thailand'>Thailand</option>
                                <option value='Timor-Leste'>Timor-Leste</option>
                                <option value='Togo'>Togo</option>
                                <option value='Tokelau'>Tokelau</option>
                                <option value='Tonga'>Tonga</option>
                                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                                <option value='Tunisia'>Tunisia</option>
                                <option value='Turkey'>Turkey</option>
                                <option value='Turkmenistan'>Turkmenistan</option>
                                <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                                <option value='Tuvalu'>Tuvalu</option>
                                <option value='Uganda'>Uganda</option>
                                <option value='Ukraine'>Ukraine</option>
                                <option value='United Arab Emirates'>United Arab Emirates</option>
                                <option value='United Kingdom'>United Kingdom</option>
                                <option value='United States'>United States</option>
                                <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option>
                                <option value='Uruguay'>Uruguay</option>
                                <option value='Uzbekistan'>Uzbekistan</option>
                                <option value='Vanuatu'>Vanuatu</option>
                                <option value='Venezuela, Bolivarian Republic of'>Venezuela, Bolivarian Republic of</option>
                                <option value='Viet Nam'>Viet Nam</option>
                                <option value='Virgin Islands, British'>Virgin Islands, British</option>
                                <option value='Virgin Islands, U.S.'>Virgin Islands, U.S.</option>
                                <option value='Wallis and Futuna'>Wallis and Futuna</option>
                                <option value='Yemen'>Yemen</option>
                                <option value='Zambia'>Zambia</option>
                                <option value='Zimbabwe'>Zimbabwe</option>
                            </select>
                            :
                            'Philippines'
                        }
                    </td>
                    <td rowSpan={2}><b>Remarks</b></td>
                    <td rowSpan={2}>
                        {
                            edit_mode_status ?
                            <textarea className='form-control' name='remarks' id='remarks'/>
                            : 
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Mobile No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='mobile_number' id='mobile_number'/>
                            :
                            '09302720000'
                        }
                    </td>
                    <td><b>Email</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='email' className='form-control border-0' name ='email' id='email'/>
                            :
                            'monkeydluffy@yahoo.com'
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Home Address</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='home_address' id='home_address'/>
                            :
                            ''
                        }
                    </td>
                    <td><b>Current Address</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='current_address' id='current_address' />
                            :
                            'Grandline'
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Home Phone No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='home_phone_number' id='home_phone_number'/>
                            :
                            ''
                        }
                    </td>
                    <td><b>Current Phone No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='current_phone_number' id='current_phone_number'/>
                            :
                            ''
                        }
                    </td>
                    <td><b>Profile Photo</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='current_phone_number' id='current_phone_number'/>
                            :
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Father's Name</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='father_name' id='father_name' />
                            : 
                            'Monkey D. Dragon'
                        }
                    </td>
                    <td><b>Father's Contact No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='father_contact_number' id='father_contact_number' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Father's Profession</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='father_profession' id='father_profession' />
                            : 
                            ''
                        }
                    </td>
                    <td><b>Father's Place of Work</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='father_place_0f_work' id='father_place_0f_work' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Father's Annual Income</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='number' className='form-control border-0' name='father_annual_income' id='father_annual_income' />
                            :
                            '0'
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Mother's Name</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='mother_name' id='mother_name' />
                            :
                            ''
                        }
                    </td>
                    <td><b>Mother's Contact No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='mother_contact_number' id='mother_contact_number' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Mother's Profession</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='mother_profession' id='mother_profession' />
                            :
                            ''
                        }
                    </td>
                    <td><b>Mother's Place of Work</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='mother_place_of_work' id='mother_place_of_work' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Mother's Annual Income</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='number' className='form-control border-0' name='mother_annual_income' id='mother_annual_income' />
                            :
                            '0'
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Guardian's Name</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='guardian_name' id='guardian_name' />
                            :
                            ''
                        }
                    </td>
                    <td><b>Guardian's Contact No.</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='guardian_contact_number' id='guardian_contact_number' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Guardian's Profession</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='guardian_profession' id='guardian_profession' />
                            :
                            ''
                        }
                    </td>
                    <td><b>Guardian's Place of Work</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='text' className='form-control border-0' name='guardian_place_of_work' id='guardian_place_of_work' />
                            :
                            ''
                        }
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Guardian's Annual Income</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='number' className='form-control border-0' name='guardian_annual_income' id='guardian_annual_income' />
                            :
                            '0'
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Addressee Of Grade Report</b></td>
                    <td>
                        {
                            edit_mode_status ?
                            <input type='number' className='form-control border-0' name='addressee_grade_report' id='addressee_grade_report' />
                            :
                            '0'
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div className='container-fluid text-center'>
            <Link to='../basic-addmission' className='btn btn-primary'>NEXT</Link>
        </div>
      </div>
    </>
  )
}

export default StudentDetail
