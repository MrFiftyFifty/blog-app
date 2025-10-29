<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(): JsonResponse
    {
        $articles = Article::with('comments')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    /**
     * Store a newly created article.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $article = Article::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    /**
     * Display the specified article with comments.
     */
    public function show(string $id): JsonResponse
    {
        $article = Article::with(['comments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Update the specified article.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $article->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified article.
     */
    public function destroy(string $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
}
