import React, { useContext, useRef, useState } from 'react'
import logo from '../../Assets/logo-summit.png'
import qrcode from 'qrcode-generator';
import HTMLReactParser from 'html-react-parser/lib/index';
import { useReactToPrint } from 'react-to-print';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Home() {

  const [isCode,setCode] = useState(false); 
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  function makeQR(elementVals){
    var typeNumber = 6;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    console.log(elementVals);
    qr.addData(`
        Name: ${elementVals.fName} ${elementVals.lName}
        Email: ${elementVals.email}
        Twitter: @${elementVals.twitter}
        Github: ${elementVals.github}
      `);
    qr.make();
    setCode(qr.createImgTag());
  }
  let valSchema = Yup.object({
    fName: Yup.string().required('Required!').min(2,"Invalid First Name"),
    lName: Yup.string().required('Required!').min(2,"Invalid Last Name"),
    email: Yup.string().required('Field Required').email('Invalid Email, Please try again'),
    twitter: Yup.string().required('Field Required!'),
    github: Yup.string().required('Required!')
  })
  let formik = useFormik({
    initialValues:{
      fName: '',
      lName: '',
      email: '',
      twitter: '',
      github: ''
    },
    validationSchema:valSchema,
    onSubmit:makeQR
  })
  return (
    <div className="">
    <div className='container my-5 d-flex justify-content-center'>
      <div className="col-md-8 mx-1 shadow shadow-lg bg-white">
        <form onSubmit={formik.handleSubmit} action='' className='p-3'>
          <div className="d-flex justify-content-between m-3">
            <div className="w-50 me-2">
              <i className="fas fa-signature position-absolute form-icons"></i>
              <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='fName' id="firstName" placeholder='First Name' value={formik.values.fName}/>
              {formik.errors.fName && formik.touched.fName ? <div class="alert alert-danger" role="alert">{formik.errors.fName}</div> : ''}
            </div>
            <div className="w-50">
              <i className="fas fa-signature position-absolute form-icons"></i>
              <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='lName' id='lastName' placeholder='Last Name' value={formik.values.lName}/>
              {formik.errors.lName && formik.touched.lName ? <div class="alert alert-danger" role="alert">{formik.errors.lName}</div> : ''}
            </div>
          </div>
          <div className="">
            <i className="fas ps-3 fa-at position-absolute form-icons ms-2"></i>
            <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control ms-3 my-3 w-75" name='email' id="email" placeholder='Email' value={formik.values.email}/>
            {formik.errors.email && formik.touched.email ? <div class="alert alert-danger" role="alert">{formik.errors.email}</div> : ''}
          </div>
          <div className="">
            <i className="fab fa-twitter ps-3 position-absolute form-icons ms-2"></i>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control ms-3 my-3 w-75" name='twitter' id="twitter" placeholder='Twitter' value={formik.values.twitter}/>
            {formik.errors.twitter && formik.touched.twitter ? <div class="alert alert-danger" role="alert">{formik.errors.twitter}</div> : ''}
          </div>
          <div className="">
            <i className="fab fa-github ps-3 position-absolute form-icons ms-2"></i>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control ms-3 my-3 w-75" name='github' id="github" placeholder='Github' value={formik.values.github}/>
            {formik.errors.github && formik.touched.github ? <div class="alert alert-danger" role="alert">{formik.errors.github}</div> : ''}
          </div>

          <button type="submit" id='btn' disabled={!(formik.isValid && formik.dirty)} onClick={formik.handleChange} className='btn btn-info ms-3'>Submit</button>

        </form>
      </div>
      <div className="col-md-3 mx-1 shadow shadow-lg bg-white">
      <div className="my-3" >
        
        <div id="placeHolder" ref={contentRef}>
            {isCode != false ? <div className='my-3'>
	<div class="id-card-tag-strip"></div>
	<div class="id-card-hook"></div>
	<div class="id-card-holder">
		<div class="id-card">
			<div class="header">
				<img src={logo}/>
			</div>
			<div class="photo">
        {HTMLReactParser(isCode)}
			</div>
			<h3>Attendee</h3>
		</div>
	</div>
            </div>:''}

            
        </div>
        {/* {isCode != false ? <h2 className='text-center'>Scan Me!</h2> : ''} */}
      </div>
      <div className="d-flex justify-content-center w-100 my-2">
        {isCode != false ? <button type="button" className='btn btn-info' onClick={reactToPrintFn}><i className="fa-solid fa-print"></i> Print</button> : ''}
      </div>
      </div>
      
    </div>
    </div>
  )
}
