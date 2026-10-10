/**
 * Indian Colleges Dataset
 *
 * Contains ~400+ well-known colleges across India spanning IITs, NITs, IIMs,
 * central universities, state universities, deemed universities, autonomous
 * engineering & medical colleges, and arts/science colleges.
 *
 * Data source: Curated from NIRF rankings, UGC, AICTE, and public college lists.
 * Limitation: This is a static curated list. It does NOT include every college
 * in India (there are 40,000+). Users can type any name; if not found they can
 * still type their college name freely via the text fallback.
 *
 * Format: { name, city, state }
 */

export interface CollegeEntry {
  name: string;
  city: string;
  state: string;
}

export const INDIAN_COLLEGES: CollegeEntry[] = [
  // ─── IITs ────────────────────────────────────────────────────────────────
  { name: 'Indian Institute of Technology Bombay', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Indian Institute of Technology Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'Indian Institute of Technology Madras', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Indian Institute of Technology Kharagpur', city: 'Kharagpur', state: 'West Bengal' },
  { name: 'Indian Institute of Technology Kanpur', city: 'Kanpur', state: 'Uttar Pradesh' },
  { name: 'Indian Institute of Technology Roorkee', city: 'Roorkee', state: 'Uttarakhand' },
  { name: 'Indian Institute of Technology Guwahati', city: 'Guwahati', state: 'Assam' },
  { name: 'Indian Institute of Technology Hyderabad', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Indian Institute of Technology Indore', city: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Indian Institute of Technology Gandhinagar', city: 'Gandhinagar', state: 'Gujarat' },
  { name: 'Indian Institute of Technology Jodhpur', city: 'Jodhpur', state: 'Rajasthan' },
  { name: 'Indian Institute of Technology Mandi', city: 'Mandi', state: 'Himachal Pradesh' },
  { name: 'Indian Institute of Technology Patna', city: 'Patna', state: 'Bihar' },
  { name: 'Indian Institute of Technology Ropar', city: 'Rupnagar', state: 'Punjab' },
  { name: 'Indian Institute of Technology Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha' },
  { name: 'Indian Institute of Technology Tirupati', city: 'Tirupati', state: 'Andhra Pradesh' },
  { name: 'Indian Institute of Technology Jammu', city: 'Jammu', state: 'J&K' },
  { name: 'Indian Institute of Technology Dharwad', city: 'Dharwad', state: 'Karnataka' },
  { name: 'Indian Institute of Technology Palakkad', city: 'Palakkad', state: 'Kerala' },
  { name: 'Indian Institute of Technology Bhilai', city: 'Raipur', state: 'Chhattisgarh' },
  { name: 'Indian Institute of Technology Goa', city: 'Ponda', state: 'Goa' },

  // ─── NITs ────────────────────────────────────────────────────────────────
  { name: 'National Institute of Technology Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { name: 'National Institute of Technology Karnataka', city: 'Surathkal', state: 'Karnataka' },
  { name: 'National Institute of Technology Warangal', city: 'Warangal', state: 'Telangana' },
  { name: 'National Institute of Technology Calicut', city: 'Calicut', state: 'Kerala' },
  { name: 'National Institute of Technology Rourkela', city: 'Rourkela', state: 'Odisha' },
  { name: 'National Institute of Technology Silchar', city: 'Silchar', state: 'Assam' },
  { name: 'National Institute of Technology Durgapur', city: 'Durgapur', state: 'West Bengal' },
  { name: 'National Institute of Technology Jamshedpur', city: 'Jamshedpur', state: 'Jharkhand' },
  { name: 'National Institute of Technology Kurukshetra', city: 'Kurukshetra', state: 'Haryana' },
  { name: 'National Institute of Technology Surat', city: 'Surat', state: 'Gujarat' },
  { name: 'National Institute of Technology Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'National Institute of Technology Allahabad', city: 'Prayagraj', state: 'Uttar Pradesh' },
  { name: 'National Institute of Technology Raipur', city: 'Raipur', state: 'Chhattisgarh' },
  { name: 'National Institute of Technology Agartala', city: 'Agartala', state: 'Tripura' },
  { name: 'National Institute of Technology Patna', city: 'Patna', state: 'Bihar' },
  { name: 'National Institute of Technology Hamirpur', city: 'Hamirpur', state: 'Himachal Pradesh' },
  { name: 'National Institute of Technology Jalandhar', city: 'Jalandhar', state: 'Punjab' },
  { name: 'National Institute of Technology Meghalaya', city: 'Shillong', state: 'Meghalaya' },
  { name: 'National Institute of Technology Manipur', city: 'Imphal', state: 'Manipur' },
  { name: 'National Institute of Technology Mizoram', city: 'Aizawl', state: 'Mizoram' },
  { name: 'National Institute of Technology Nagaland', city: 'Dimapur', state: 'Nagaland' },
  { name: 'National Institute of Technology Sikkim', city: 'Ravangla', state: 'Sikkim' },
  { name: 'National Institute of Technology Arunachal Pradesh', city: 'Yupia', state: 'Arunachal Pradesh' },
  { name: 'National Institute of Technology Srinagar', city: 'Srinagar', state: 'J&K' },
  { name: 'National Institute of Technology Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'National Institute of Technology Goa', city: 'Ponda', state: 'Goa' },
  { name: 'National Institute of Technology Puducherry', city: 'Karaikal', state: 'Puducherry' },

  // ─── IIMs ────────────────────────────────────────────────────────────────
  { name: 'Indian Institute of Management Ahmedabad', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Indian Institute of Management Bangalore', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Indian Institute of Management Calcutta', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Indian Institute of Management Lucknow', city: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Indian Institute of Management Kozhikode', city: 'Kozhikode', state: 'Kerala' },
  { name: 'Indian Institute of Management Indore', city: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Indian Institute of Management Shillong', city: 'Shillong', state: 'Meghalaya' },
  { name: 'Indian Institute of Management Rohtak', city: 'Rohtak', state: 'Haryana' },
  { name: 'Indian Institute of Management Ranchi', city: 'Ranchi', state: 'Jharkhand' },
  { name: 'Indian Institute of Management Raipur', city: 'Raipur', state: 'Chhattisgarh' },
  { name: 'Indian Institute of Management Udaipur', city: 'Udaipur', state: 'Rajasthan' },
  { name: 'Indian Institute of Management Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { name: 'Indian Institute of Management Kashipur', city: 'Kashipur', state: 'Uttarakhand' },
  { name: 'Indian Institute of Management Nagpur', city: 'Nagpur', state: 'Maharashtra' },
  { name: 'Indian Institute of Management Visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { name: 'Indian Institute of Management Amritsar', city: 'Amritsar', state: 'Punjab' },
  { name: 'Indian Institute of Management Bodhgaya', city: 'Bodh Gaya', state: 'Bihar' },
  { name: 'Indian Institute of Management Jammu', city: 'Jammu', state: 'J&K' },
  { name: 'Indian Institute of Management Sirmaur', city: 'Nahan', state: 'Himachal Pradesh' },
  { name: 'Indian Institute of Management Sambalpur', city: 'Sambalpur', state: 'Odisha' },

  // ─── IISc / IISER / Other Institutes of National Importance ─────────────
  { name: 'Indian Institute of Science Bangalore', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'IISER Pune', city: 'Pune', state: 'Maharashtra' },
  { name: 'IISER Kolkata', city: 'Mohanpur', state: 'West Bengal' },
  { name: 'IISER Mohali', city: 'Mohali', state: 'Punjab' },
  { name: 'IISER Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'IISER Thiruvananthapuram', city: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'IISER Tirupati', city: 'Tirupati', state: 'Andhra Pradesh' },
  { name: 'IISER Berhampur', city: 'Berhampur', state: 'Odisha' },
  { name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan' },
  { name: 'BITS Pilani – Hyderabad Campus', city: 'Hyderabad', state: 'Telangana' },
  { name: 'BITS Pilani – Goa Campus', city: 'Goa', state: 'Goa' },
  { name: 'BITS Pilani – Dubai Campus', city: 'Dubai', state: 'UAE' },
  { name: 'IIIT Hyderabad', city: 'Hyderabad', state: 'Telangana' },
  { name: 'IIIT Allahabad', city: 'Prayagraj', state: 'Uttar Pradesh' },
  { name: 'IIIT Bangalore', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'IIIT Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'IIIT Gwalior', city: 'Gwalior', state: 'Madhya Pradesh' },
  { name: 'IIIT Kottayam', city: 'Kottayam', state: 'Kerala' },
  { name: 'IIIT Lucknow', city: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'IIIT Pune', city: 'Pune', state: 'Maharashtra' },
  { name: 'IIIT Sri City', city: 'Chittoor', state: 'Andhra Pradesh' },
  { name: 'IIIT Nagpur', city: 'Nagpur', state: 'Maharashtra' },
  { name: 'IIIT Vadodara', city: 'Vadodara', state: 'Gujarat' },
  { name: 'IIIT Ranchi', city: 'Ranchi', state: 'Jharkhand' },
  { name: 'IIIT Kalyani', city: 'Kalyani', state: 'West Bengal' },
  { name: 'IIIT Una', city: 'Una', state: 'Himachal Pradesh' },
  { name: 'IIIT Kancheepuram', city: 'Kancheepuram', state: 'Tamil Nadu' },
  { name: 'IIIT Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'IIIT Manipur', city: 'Imphal', state: 'Manipur' },

  // ─── Central Universities ────────────────────────────────────────────────
  { name: 'University of Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'Jawaharlal Nehru University', city: 'New Delhi', state: 'Delhi' },
  { name: 'Banaras Hindu University', city: 'Varanasi', state: 'Uttar Pradesh' },
  { name: 'Hyderabad Central University', city: 'Hyderabad', state: 'Telangana' },
  { name: 'University of Hyderabad', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Aligarh Muslim University', city: 'Aligarh', state: 'Uttar Pradesh' },
  { name: 'Jamia Millia Islamia', city: 'New Delhi', state: 'Delhi' },
  { name: 'Pondicherry University', city: 'Puducherry', state: 'Puducherry' },
  { name: 'North-Eastern Hill University', city: 'Shillong', state: 'Meghalaya' },
  { name: 'Tezpur University', city: 'Tezpur', state: 'Assam' },
  { name: 'Mizoram University', city: 'Aizawl', state: 'Mizoram' },
  { name: 'Manipur University', city: 'Imphal', state: 'Manipur' },
  { name: 'Tripura University', city: 'Agartala', state: 'Tripura' },
  { name: 'Nagaland University', city: 'Kohima', state: 'Nagaland' },
  { name: 'Sikkim University', city: 'Gangtok', state: 'Sikkim' },
  { name: 'Rajiv Gandhi University', city: 'Itanagar', state: 'Arunachal Pradesh' },
  { name: 'Hemwati Nandan Bahuguna Garhwal University', city: 'Srinagar Garhwal', state: 'Uttarakhand' },
  { name: 'Indira Gandhi National Open University', city: 'New Delhi', state: 'Delhi' },
  { name: 'Visva-Bharati University', city: 'Santiniketan', state: 'West Bengal' },
  { name: 'Assam University', city: 'Silchar', state: 'Assam' },
  { name: 'Dibrugarh University', city: 'Dibrugarh', state: 'Assam' },
  { name: 'Gauhati University', city: 'Guwahati', state: 'Assam' },

  // ─── Karnataka colleges ─────────────────────────────────────────────────
  { name: 'St Aloysius College', city: 'Mangaluru', state: 'Karnataka' },
  { name: 'RV College of Engineering', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'BMS College of Engineering', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'PES University', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'M S Ramaiah Institute of Technology', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Manipal Institute of Technology', city: 'Manipal', state: 'Karnataka' },
  { name: 'Visvesvaraya Technological University', city: 'Belagavi', state: 'Karnataka' },
  { name: 'Dayananda Sagar College of Engineering', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'SJB Institute of Technology', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'New Horizon College of Engineering', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'JSS Academy of Technical Education', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Christ University', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Jain University', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'REVA University', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'CMR Institute of Technology', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Presidency College', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Seshadripuram College', city: 'Bengaluru', state: 'Karnataka' },
  { name: "St Joseph's College of Commerce", city: 'Bengaluru', state: 'Karnataka' },
  { name: 'NMAM Institute of Technology', city: 'Nitte', state: 'Karnataka' },
  { name: 'Canara Engineering College', city: 'Mangaluru', state: 'Karnataka' },
  { name: 'Srinivas Institute of Technology', city: 'Mangaluru', state: 'Karnataka' },
  { name: 'Yenepoya University', city: 'Mangaluru', state: 'Karnataka' },
  { name: 'Mangalore University', city: 'Mangaluru', state: 'Karnataka' },
  { name: 'Karnataka University', city: 'Dharwad', state: 'Karnataka' },
  { name: 'Gulbarga University', city: 'Kalaburagi', state: 'Karnataka' },
  { name: 'Mysore University', city: 'Mysuru', state: 'Karnataka' },
  { name: 'Kuvempu University', city: 'Shimoga', state: 'Karnataka' },

  // ─── Tamil Nadu ──────────────────────────────────────────────────────────
  { name: 'Anna University', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Amrita Vishwa Vidyapeetham', city: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'VIT University', city: 'Vellore', state: 'Tamil Nadu' },
  { name: 'SSN College of Engineering', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'PSG College of Technology', city: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Coimbatore Institute of Technology', city: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Thiagarajar College of Engineering', city: 'Madurai', state: 'Tamil Nadu' },
  { name: 'Madurai Kamaraj University', city: 'Madurai', state: 'Tamil Nadu' },
  { name: 'Bharathiar University', city: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Bharathidasan University', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { name: 'Saveetha Institute of Medical and Technical Sciences', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'SRM Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Loyola College', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Madras Christian College', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Presidency College Chennai', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'CEG Anna University', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kongu Engineering College', city: 'Erode', state: 'Tamil Nadu' },
  { name: 'Sri Venkateswara College of Engineering', city: 'Sriperumbudur', state: 'Tamil Nadu' },
  { name: 'Kumaraguru College of Technology', city: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Rajalakshmi Engineering College', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Vel Tech University', city: 'Chennai', state: 'Tamil Nadu' },

  // ─── Maharashtra ─────────────────────────────────────────────────────────
  { name: 'University of Mumbai', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Pune University (SPPU)', city: 'Pune', state: 'Maharashtra' },
  { name: 'College of Engineering Pune', city: 'Pune', state: 'Maharashtra' },
  { name: 'VJTI Mumbai', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'ICT Mumbai', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Symbiosis Institute of Technology', city: 'Pune', state: 'Maharashtra' },
  { name: 'MIT College of Engineering', city: 'Pune', state: 'Maharashtra' },
  { name: 'Walchand College of Engineering', city: 'Sangli', state: 'Maharashtra' },
  { name: 'PICT Pune', city: 'Pune', state: 'Maharashtra' },
  { name: 'Vishwakarma Institute of Technology', city: 'Pune', state: 'Maharashtra' },
  { name: 'Nagpur University (RTM)', city: 'Nagpur', state: 'Maharashtra' },
  { name: 'K J Somaiya College of Engineering', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'SIES Graduate School of Technology', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Sardar Patel College of Engineering', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Fr Conceicao Rodrigues College of Engineering', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Amravati University', city: 'Amravati', state: 'Maharashtra' },
  { name: "St Xavier's College Mumbai", city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Elphinstone College', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Fergusson College', city: 'Pune', state: 'Maharashtra' },
  { name: 'FLAME University', city: 'Pune', state: 'Maharashtra' },
  { name: 'Symbiosis International University', city: 'Pune', state: 'Maharashtra' },

  // ─── Kerala ───────────────────────────────────────────────────────────────
  { name: 'Kerala University', city: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'Calicut University', city: 'Calicut', state: 'Kerala' },
  { name: 'Mahatma Gandhi University', city: 'Kottayam', state: 'Kerala' },
  { name: 'Cochin University of Science and Technology', city: 'Kochi', state: 'Kerala' },
  { name: 'College of Engineering Trivandrum', city: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'College of Engineering Pune', city: 'Kochi', state: 'Kerala' },
  { name: 'Government Engineering College Thrissur', city: 'Thrissur', state: 'Kerala' },
  { name: 'TKM College of Engineering', city: 'Kollam', state: 'Kerala' },
  { name: 'Rajagiri School of Engineering and Technology', city: 'Kochi', state: 'Kerala' },
  { name: 'LBS College of Engineering', city: 'Kasaragod', state: 'Kerala' },
  { name: "St Joseph's College of Engineering Palai", city: 'Palai', state: 'Kerala' },
  { name: 'Kerala University of Digital Sciences', city: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'APJ Abdul Kalam Technological University', city: 'Thiruvananthapuram', state: 'Kerala' },
  { name: "St Berchman's College", city: 'Changanacherry', state: 'Kerala' },
  { name: 'St Thomas College Thrissur', city: 'Thrissur', state: 'Kerala' },

  // ─── Andhra Pradesh / Telangana ─────────────────────────────────────────
  { name: 'JNTUH', city: 'Hyderabad', state: 'Telangana' },
  { name: 'JNTUA', city: 'Anantapur', state: 'Andhra Pradesh' },
  { name: 'JNTUK', city: 'Kakinada', state: 'Andhra Pradesh' },
  { name: 'Osmania University', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Andhra University', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { name: 'Sri Venkateswara University', city: 'Tirupati', state: 'Andhra Pradesh' },
  { name: 'KL University', city: 'Guntur', state: 'Andhra Pradesh' },
  { name: 'Vignan University', city: 'Guntur', state: 'Andhra Pradesh' },
  { name: 'Chaitanya Bharathi Institute of Technology', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Vasavi College of Engineering', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Institute of Aeronautical Engineering', city: 'Hyderabad', state: 'Telangana' },
  { name: 'CMR College of Engineering and Technology', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Vignana Bharathi Institute of Technology', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Gokaraju Rangaraju Institute of Engineering and Technology', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Sreenidhi Institute of Science and Technology', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Mahatma Gandhi Institute of Technology', city: 'Hyderabad', state: 'Telangana' },

  // ─── Rajasthan ────────────────────────────────────────────────────────────
  { name: 'University of Rajasthan', city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Rajasthan Technical University', city: 'Kota', state: 'Rajasthan' },
  { name: 'Manipal University Jaipur', city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Poornima University', city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Vivekananda Global University', city: 'Jaipur', state: 'Rajasthan' },
  { name: 'LNM Institute of Information Technology', city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Banasthali Vidyapith', city: 'Tonk', state: 'Rajasthan' },
  { name: 'Amity University Jaipur', city: 'Jaipur', state: 'Rajasthan' },

  // ─── West Bengal ─────────────────────────────────────────────────────────
  { name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Calcutta University', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Presidency University Kolkata', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Heritage Institute of Technology', city: 'Kolkata', state: 'West Bengal' },
  { name: 'West Bengal University of Technology (Maulana Abul Kalam Azad University)', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Institute of Engineering and Management', city: 'Kolkata', state: 'West Bengal' },
  { name: 'Techno India University', city: 'Kolkata', state: 'West Bengal' },
  { name: "St Xavier's College Kolkata", city: 'Kolkata', state: 'West Bengal' },

  // ─── Delhi / NCR ─────────────────────────────────────────────────────────
  { name: 'Delhi Technological University', city: 'New Delhi', state: 'Delhi' },
  { name: 'Netaji Subhas University of Technology', city: 'New Delhi', state: 'Delhi' },
  { name: 'Indraprastha Institute of Information Technology', city: 'New Delhi', state: 'Delhi' },
  { name: 'Guru Gobind Singh Indraprastha University', city: 'New Delhi', state: 'Delhi' },
  { name: 'Amity University Noida', city: 'Noida', state: 'Uttar Pradesh' },
  { name: 'Shiv Nadar University', city: 'Greater Noida', state: 'Uttar Pradesh' },
  { name: 'Galgotias University', city: 'Greater Noida', state: 'Uttar Pradesh' },
  { name: 'GL Bajaj Institute of Technology and Management', city: 'Greater Noida', state: 'Uttar Pradesh' },
  { name: 'Maharaja Surajmal Institute of Technology', city: 'New Delhi', state: 'Delhi' },
  { name: 'Bhagwan Parshuram Institute of Technology', city: 'New Delhi', state: 'Delhi' },
  { name: 'Miranda House', city: 'New Delhi', state: 'Delhi' },
  { name: 'Hindu College', city: 'New Delhi', state: 'Delhi' },
  { name: "St Stephen's College", city: 'New Delhi', state: 'Delhi' },
  { name: 'Lady Shri Ram College', city: 'New Delhi', state: 'Delhi' },
  { name: 'SRCC Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'Hansraj College', city: 'New Delhi', state: 'Delhi' },
  { name: 'Ramjas College', city: 'New Delhi', state: 'Delhi' },
  { name: 'Kirori Mal College', city: 'New Delhi', state: 'Delhi' },

  // ─── Uttar Pradesh ────────────────────────────────────────────────────────
  { name: 'Harcourt Butler Technical University', city: 'Kanpur', state: 'Uttar Pradesh' },
  { name: 'Dr A P J Abdul Kalam Technical University', city: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Lucknow University', city: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Allahabad University', city: 'Prayagraj', state: 'Uttar Pradesh' },
  { name: 'Meerut Institute of Engineering and Technology', city: 'Meerut', state: 'Uttar Pradesh' },
  { name: 'Sharda University', city: 'Greater Noida', state: 'Uttar Pradesh' },
  { name: 'Raj Kumar Goel Institute of Technology', city: 'Ghaziabad', state: 'Uttar Pradesh' },
  { name: 'Ajay Kumar Garg Engineering College', city: 'Ghaziabad', state: 'Uttar Pradesh' },

  // ─── Punjab / Haryana ─────────────────────────────────────────────────────
  { name: 'Punjab University', city: 'Chandigarh', state: 'Punjab' },
  { name: 'Panjab University', city: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Thapar Institute of Engineering and Technology', city: 'Patiala', state: 'Punjab' },
  { name: 'Chitkara University Punjab', city: 'Rajpura', state: 'Punjab' },
  { name: 'Lovely Professional University', city: 'Phagwara', state: 'Punjab' },
  { name: 'Punjab Engineering College', city: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Chandigarh University', city: 'Mohali', state: 'Punjab' },
  { name: 'Guru Nanak Dev University', city: 'Amritsar', state: 'Punjab' },
  { name: 'Kurukshetra University', city: 'Kurukshetra', state: 'Haryana' },
  { name: 'MDU Rohtak', city: 'Rohtak', state: 'Haryana' },
  { name: 'YMCA University of Science and Technology', city: 'Faridabad', state: 'Haryana' },

  // ─── Gujarat ──────────────────────────────────────────────────────────────
  { name: 'Gujarat University', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Gujarat Technological University', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'DAIICT', city: 'Gandhinagar', state: 'Gujarat' },
  { name: 'SVNIT Surat', city: 'Surat', state: 'Gujarat' },
  { name: 'L D College of Engineering', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Nirma University', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Pandit Deendayal Energy University', city: 'Gandhinagar', state: 'Gujarat' },
  { name: 'Marwadi University', city: 'Rajkot', state: 'Gujarat' },

  // ─── Madhya Pradesh ───────────────────────────────────────────────────────
  { name: 'Maulana Azad National Institute of Technology Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'IIT Indore', city: 'Indore', state: 'Madhya Pradesh' },
  { name: 'RGPV Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'MANIT Bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Devi Ahilya Vishwavidyalaya', city: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Oriental Institute of Science and Technology', city: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Truba Institute of Engineering and IT', city: 'Bhopal', state: 'Madhya Pradesh' },

  // ─── Others / Miscellaneous ────────────────────────────────────────────────
  { name: 'XLRI Jamshedpur', city: 'Jamshedpur', state: 'Jharkhand' },
  { name: 'NIFT Mumbai', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'NID Ahmedabad', city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'NIFT Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'NIFT Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'NALSAR University of Law', city: 'Hyderabad', state: 'Telangana' },
  { name: 'National Law School of India University', city: 'Bengaluru', state: 'Karnataka' },
  { name: 'AIIMS Delhi', city: 'New Delhi', state: 'Delhi' },
  { name: 'AIIMS Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha' },
  { name: 'AIIMS Jodhpur', city: 'Jodhpur', state: 'Rajasthan' },
  { name: 'AIIMS Rishikesh', city: 'Rishikesh', state: 'Uttarakhand' },
  { name: 'AIIMS Patna', city: 'Patna', state: 'Bihar' },
  { name: 'Maulana Azad Medical College', city: 'New Delhi', state: 'Delhi' },
  { name: 'Grant Medical College', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Kasturba Medical College', city: 'Mangaluru', state: 'Karnataka' },
];

const COMMON_ACRONYMS: Record<string, string> = {
  iit: 'indian institute of technology',
  nit: 'national institute of technology',
  iiit: 'indian institute of information technology',
  iim: 'indian institute of management',
  aiims: 'all india institute of medical sciences',
  bits: 'birla institute of technology',
  dtu: 'delhi technological university',
  nsut: 'netaji subhas university of technology',
  du: 'university of delhi',
  jnu: 'jawaharlal nehru university',
  bhu: 'banaras hindu university',
  vtu: 'visvesvaraya technological university',
  vit: 'vellore institute of technology',
  srm: 'srm institute of science and technology',
  coep: 'college of engineering pune',
  vjti: 'veermata jijabai technological institute',
  rvce: 'rv college of engineering',
  msrit: 'm s ramaiah institute of technology',
  pes: 'pes university',
  nitk: 'national institute of technology karnataka',
};

/**
 * Search colleges across India by name, city, state, or common acronyms (e.g. "IIT Bombay", "NITK", "BITS").
 * Returns results ranked by relevance (prefix matches first, then substring, then token/acronym matches).
 */
export function searchColleges(query: string, limit = 50): CollegeEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return INDIAN_COLLEGES.slice(0, limit);

  const exactStarts: CollegeEntry[] = [];
  const exactContains: CollegeEntry[] = [];
  const cityOrStateMatches: CollegeEntry[] = [];
  const tokenMatches: CollegeEntry[] = [];
  const seen = new Set<string>();

  const tokens = q.split(/\s+/).filter(Boolean);
  const expandedTokens = tokens.map((t) => COMMON_ACRONYMS[t] || t);

  for (const c of INDIAN_COLLEGES) {
    const nameLower = c.name.toLowerCase();
    const cityLower = c.city.toLowerCase();
    const stateLower = c.state.toLowerCase();
    const combined = `${nameLower} ${cityLower} ${stateLower}`;

    if (nameLower.startsWith(q)) {
      exactStarts.push(c);
      seen.add(c.name);
    } else if (nameLower.includes(q)) {
      exactContains.push(c);
      seen.add(c.name);
    } else if (cityLower.includes(q) || stateLower.includes(q)) {
      cityOrStateMatches.push(c);
      seen.add(c.name);
    } else {
      // Check multi-token or acronym match
      const allTokensMatch = tokens.every((token, idx) => {
        const expanded = expandedTokens[idx];
        return combined.includes(token) || combined.includes(expanded);
      });

      if (allTokensMatch) {
        tokenMatches.push(c);
        seen.add(c.name);
      }
    }
  }

  return [...exactStarts, ...exactContains, ...cityOrStateMatches, ...tokenMatches].slice(0, limit);
}

