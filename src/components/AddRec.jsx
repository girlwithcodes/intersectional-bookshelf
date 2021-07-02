import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function AdRec(props) {
  return (
    <main>
      <h2>Make a Recommendation</h2>
      <form id="add-rec-form"></form>
    </main>
  )
}
export default AdRec;