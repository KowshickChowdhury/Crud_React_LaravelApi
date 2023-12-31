<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class StudentController extends Controller
{
    public function index(request $request){
        // $students = Student::all();
        // if($students->count() > 0){
        //     return response()->json([
        //         'status' => 200,
        //         'students' => $students
        //     ], 200);
        // }else{
        //     return response()->json([
        //         'status' => 404,
        //         'message' => "No Records Found"
        //     ], 404);
        // }
        
        $perPage = $request->input('per_page'); // Default to 10 items per page
        $students = Student::paginate($perPage);

        return response()->json($students);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'course' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:10',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => '422',
                'error' => $validator->messages()
            ], 422);
        }else{
            $student = Student::create([
                'name'   => $request->name,
                'course' => $request->course,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if($student){
                return response()->json([
                    'status' => 200,
                    'message' => "Student Created Succesfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Something Went Wrong!"
                ], 500);
            }
        }
    }

    public function show($id){
        $student = Student::find($id);
        if($student){
            return response()->json([
                'status' => 200,
                'message' => $student
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "No Such Student Found"
            ], 404);
        }
    }

    public function edit($id){
        $student = Student::find($id);
        if($student){

            return response()->json([
                'status' => 200,
                'student' => $student
            ], 200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "No Such Student Found"
            ], 404);
            
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'course' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:10',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => '422',
                'error' => $validator->messages()
            ], 422);
        }else{
            $student = Student::find($id);

            if($student){

                $student->update([
                    'name'   => $request->name,
                    'course' => $request->course,
                    'email' => $request->email,
                    'phone' => $request->phone,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Student Updated Succesfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => "No Such Student Found!"
                ], 404);
            }
        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if($student){
            $student -> delete();
            return response()->json([
                'status' => 200,
                'message' => "Student Deleted Succesfully"
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "No Such Student Found"
            ], 404);
        }
    }

    public function destroyMultiple(Request $request)
{
    $studentIds = $request->input('student_ids');

    // Use a transaction to ensure atomicity
    DB::beginTransaction();

    try {
        // Delete the selected students
        Student::whereIn('id', $studentIds)->delete();

        // Commit the transaction
        DB::commit();

        return response()->json([
            'status' => 200,
            'message' => "Students Deleted Successfully"
        ], 200);
    } catch (\Exception $e) {
        // Rollback the transaction in case of an error
        DB::rollback();

        return response()->json([
            'status' => 500,
            'message' => "An error occurred while deleting students."
        ], 500);
    }
}

    public function search($key){
        $student = Student::where('name','Like',"%$key%")->get();
        if($student){
            return response()->json([
                'status' => 200,
                'message' => $student
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "No Such Student Found"
            ], 404);
        }
    }

}
